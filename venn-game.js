// Venn Diagram Game Logic

class VennGame {
    constructor() {
        this.currentPuzzle = null;
        this.maxTries = 5;
        this.triesLeft = 5;
        this.gameOver = false;
        this.placements = {}; // word -> zone
        this.correctPlacements = new Set();
        this.usedPuzzles = [];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        document.getElementById('venn-check-btn').addEventListener('click', () => this.checkPlacements());
        document.getElementById('venn-restart-btn').addEventListener('click', () => this.startNewGame());
        document.getElementById('venn-back-menu-btn').addEventListener('click', () => this.backToMenu());
    }
    
    startNewGame() {
        // Pick a random puzzle we haven't used recently
        const availablePuzzles = window.VENN_PUZZLES.filter(p => !this.usedPuzzles.includes(p.id));
        if (availablePuzzles.length === 0) {
            this.usedPuzzles = [];
        }
        const puzzles = availablePuzzles.length > 0 ? availablePuzzles : window.VENN_PUZZLES;
        this.currentPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
        this.usedPuzzles.push(this.currentPuzzle.id);
        if (this.usedPuzzles.length > 5) this.usedPuzzles.shift();
        
        this.triesLeft = this.maxTries;
        this.gameOver = false;
        this.placements = {};
        this.correctPlacements = new Set();
        
        // Hide modal
        document.getElementById('venn-game-over-modal').classList.add('hidden');
        
        // Update UI
        this.updateTriesDisplay();
        this.buildPuzzle();
        this.showMessage('');
    }
    
    buildPuzzle() {
        // Set category labels
        document.getElementById('venn-label-left').textContent = this.currentPuzzle.leftCategory;
        document.getElementById('venn-label-right').textContent = this.currentPuzzle.rightCategory;
        
        // Clear zones
        document.getElementById('zone-left').innerHTML = '';
        document.getElementById('zone-right').innerHTML = '';
        document.getElementById('zone-middle').innerHTML = '';
        
        // Build word bank
        const wordBank = document.getElementById('word-bank-words');
        wordBank.innerHTML = '';
        
        // Shuffle words
        const shuffledWords = [...this.currentPuzzle.words].sort(() => Math.random() - 0.5);
        
        shuffledWords.forEach(wordData => {
            const wordEl = this.createWordElement(wordData.word);
            wordBank.appendChild(wordEl);
        });
        
        // Setup drop zones
        this.setupDropZones();
    }
    
    createWordElement(word) {
        const el = document.createElement('div');
        el.className = 'venn-word';
        el.textContent = word;
        el.dataset.word = word;
        el.draggable = true;
        
        // Drag events
        el.addEventListener('dragstart', (e) => this.onDragStart(e));
        el.addEventListener('dragend', (e) => this.onDragEnd(e));
        
        // Touch events for mobile
        el.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
        el.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
        el.addEventListener('touchend', (e) => this.onTouchEnd(e));
        
        return el;
    }
    
    setupDropZones() {
        const zones = ['zone-left', 'zone-right', 'zone-middle'];
        zones.forEach(zoneId => {
            const zone = document.getElementById(zoneId);
            zone.addEventListener('dragover', (e) => this.onDragOver(e));
            zone.addEventListener('dragleave', (e) => this.onDragLeave(e));
            zone.addEventListener('drop', (e) => this.onDrop(e));
        });
        
        // Also allow dropping back to word bank
        const wordBank = document.getElementById('word-bank-words');
        wordBank.addEventListener('dragover', (e) => this.onDragOver(e));
        wordBank.addEventListener('dragleave', (e) => this.onDragLeave(e));
        wordBank.addEventListener('drop', (e) => this.onDropToBank(e));
    }
    
    // Drag and Drop handlers
    onDragStart(e) {
        if (this.gameOver) return;
        const word = e.target.dataset.word;
        if (this.correctPlacements.has(word)) return; // Can't move correct words
        
        e.dataTransfer.setData('text/plain', word);
        e.target.classList.add('dragging');
    }
    
    onDragEnd(e) {
        e.target.classList.remove('dragging');
    }
    
    onDragOver(e) {
        if (this.gameOver) return;
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }
    
    onDragLeave(e) {
        e.currentTarget.classList.remove('drag-over');
    }
    
    onDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        if (this.gameOver) return;
        
        const word = e.dataTransfer.getData('text/plain');
        if (this.correctPlacements.has(word)) return;
        
        const zone = e.currentTarget.dataset.zone;
        this.placeWord(word, zone);
    }
    
    onDropToBank(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        if (this.gameOver) return;
        
        const word = e.dataTransfer.getData('text/plain');
        if (this.correctPlacements.has(word)) return;
        
        this.returnWordToBank(word);
    }
    
    // Touch handlers for mobile
    touchDragElement = null;
    touchClone = null;
    touchStartX = 0;
    touchStartY = 0;
    
    onTouchStart(e) {
        if (this.gameOver) return;
        const word = e.target.dataset.word;
        if (this.correctPlacements.has(word)) return;
        
        this.touchDragElement = e.target;
        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        
        // Create visual clone
        this.touchClone = e.target.cloneNode(true);
        this.touchClone.style.position = 'fixed';
        this.touchClone.style.pointerEvents = 'none';
        this.touchClone.style.zIndex = '1000';
        this.touchClone.style.opacity = '0.9';
        this.touchClone.classList.add('dragging');
        document.body.appendChild(this.touchClone);
        
        this.updateTouchClonePosition(touch);
        e.target.style.opacity = '0.3';
    }
    
    onTouchMove(e) {
        if (!this.touchDragElement || this.gameOver) return;
        e.preventDefault();
        
        const touch = e.touches[0];
        this.updateTouchClonePosition(touch);
    }
    
    updateTouchClonePosition(touch) {
        if (!this.touchClone) return;
        this.touchClone.style.left = (touch.clientX - 40) + 'px';
        this.touchClone.style.top = (touch.clientY - 20) + 'px';
    }
    
    onTouchEnd(e) {
        if (!this.touchDragElement || this.gameOver) return;
        
        const word = this.touchDragElement.dataset.word;
        this.touchDragElement.style.opacity = '1';
        
        if (this.touchClone) {
            this.touchClone.remove();
            this.touchClone = null;
        }
        
        // Find drop target
        const touch = e.changedTouches[0];
        const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
        
        if (dropTarget) {
            const zone = dropTarget.closest('.venn-zone');
            const bank = dropTarget.closest('.word-bank-words');
            
            if (zone && !this.correctPlacements.has(word)) {
                this.placeWord(word, zone.dataset.zone);
            } else if (bank) {
                this.returnWordToBank(word);
            }
        }
        
        this.touchDragElement = null;
    }
    
    placeWord(word, zone) {
        // Remove from current location
        const existingWord = document.querySelector(`.venn-word[data-word="${word}"]`);
        if (existingWord) {
            existingWord.remove();
        }
        
        // Add to new zone
        const zoneEl = document.getElementById(`zone-${zone}`);
        const wordEl = this.createWordElement(word);
        wordEl.classList.add('in-zone');
        zoneEl.appendChild(wordEl);
        
        this.placements[word] = zone;
    }
    
    returnWordToBank(word) {
        // Remove from zone
        const existingWord = document.querySelector(`.venn-word[data-word="${word}"]`);
        if (existingWord) {
            existingWord.remove();
        }
        
        // Add back to bank
        const wordBank = document.getElementById('word-bank-words');
        const wordEl = this.createWordElement(word);
        wordBank.appendChild(wordEl);
        
        delete this.placements[word];
    }
    
    checkPlacements() {
        if (this.gameOver) return;
        
        // Check if all words are placed
        const placedCount = Object.keys(this.placements).length;
        const totalWords = this.currentPuzzle.words.length - this.correctPlacements.size;
        
        if (placedCount < totalWords) {
            this.showMessage('יש למקם את כל המילים!', 'error');
            return;
        }
        
        let allCorrect = true;
        let newCorrect = 0;
        
        // Check each placement
        this.currentPuzzle.words.forEach(wordData => {
            if (this.correctPlacements.has(wordData.word)) return; // Already correct
            
            const placement = this.placements[wordData.word];
            const wordEl = document.querySelector(`.venn-word[data-word="${wordData.word}"]`);
            
            if (placement === wordData.zone) {
                // Correct!
                this.correctPlacements.add(wordData.word);
                if (wordEl) {
                    wordEl.classList.add('correct');
                    wordEl.draggable = false;
                }
                newCorrect++;
                delete this.placements[wordData.word];
            } else {
                // Incorrect - return to bank
                allCorrect = false;
                if (wordEl) {
                    wordEl.classList.add('incorrect');
                    setTimeout(() => {
                        this.returnWordToBank(wordData.word);
                    }, 500);
                }
            }
        });
        
        // Check win condition
        if (this.correctPlacements.size === this.currentPuzzle.words.length) {
            this.gameOver = true;
            setTimeout(() => this.showWinModal(), 600);
            return;
        }
        
        // Decrease tries
        this.triesLeft--;
        this.updateTriesDisplay();
        
        if (newCorrect > 0) {
            this.showMessage(`${newCorrect} מילים נכונות! 👍`, 'success');
        }
        
        // Check lose condition
        if (this.triesLeft === 0) {
            this.gameOver = true;
            setTimeout(() => this.showLoseModal(), 600);
            return;
        }
    }
    
    updateTriesDisplay() {
        document.getElementById('venn-tries-left').textContent = this.triesLeft;
    }
    
    showMessage(text, type = '') {
        const msg = document.getElementById('venn-message');
        msg.textContent = text;
        msg.className = 'message ' + type;
        
        if (type === 'success') {
            msg.style.color = 'var(--correct)';
        }
    }
    
    showWinModal() {
        const modal = document.getElementById('venn-game-over-modal');
        document.getElementById('venn-modal-icon').textContent = '🎉';
        document.getElementById('venn-modal-title').textContent = 'כל הכבוד!';
        document.getElementById('venn-modal-title').className = 'win';
        
        const triesUsed = this.maxTries - this.triesLeft + 1;
        document.getElementById('venn-modal-message').textContent = `פתרת את החידה ב-${triesUsed} ניחושים!`;
        
        modal.classList.remove('hidden');
        this.createConfetti();
    }
    
    showLoseModal() {
        const modal = document.getElementById('venn-game-over-modal');
        document.getElementById('venn-modal-icon').textContent = '😢';
        document.getElementById('venn-modal-title').textContent = 'לא הצלחת הפעם';
        document.getElementById('venn-modal-title').className = 'lose';
        document.getElementById('venn-modal-message').textContent = 'נסה שוב!';
        
        modal.classList.remove('hidden');
    }
    
    backToMenu() {
        document.getElementById('venn-game-over-modal').classList.add('hidden');
        document.getElementById('venn-game-container').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('hidden');
    }
    
    createConfetti() {
        const colors = ['#ffd700', '#ff6b35', '#ff2e63', '#08d9d6', '#9d4edd', '#10b981'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.width = (Math.random() * 10 + 5) + 'px';
                confetti.style.height = (Math.random() * 10 + 5) + 'px';
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 50);
        }
    }
}

// Initialize
window.vennGame = new VennGame();

