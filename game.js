// Hebrew Word Guessing Game

class HebrewWordGame {
    constructor() {
        this.currentMode = null;
        this.wordLength = 0;
        this.targetWord = '';
        this.guesses = [];
        this.maxTries = 6;
        this.triesLeft = 6;
        this.gameOver = false;
        this.letterStatus = {};
        
        this.init();
    }
    
    init() {
        this.bindModeSelection();
        this.bindButtons();
        this.bindInput();
    }
    
    bindModeSelection() {
        const modeButtons = document.querySelectorAll('.mode-btn');
        modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                const letters = parseInt(btn.dataset.letters);
                this.startGame(mode, letters);
            });
        });
    }
    
    bindButtons() {
        document.getElementById('submit-btn').addEventListener('click', () => this.submitGuess());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
        document.getElementById('change-mode-btn').addEventListener('click', () => this.showModeSelection());
    }
    
    bindInput() {
        const input = document.getElementById('guess-input');
        
        // Handle input changes
        input.addEventListener('input', (e) => {
            // Don't process if game hasn't started or is over
            if (!this.currentMode || this.gameOver) {
                return;
            }
            
            // Filter to only Hebrew letters
            const hebrewLetters = 'אבגדהוזחטיכךלמםנןסעפףצץקרשת';
            let value = e.target.value.split('').filter(char => hebrewLetters.includes(char)).join('');
            
            // Limit to word length (only if wordLength is set)
            if (this.wordLength > 0 && value.length > this.wordLength) {
                value = value.substring(0, this.wordLength);
            }
            
            e.target.value = value;
            this.updateCurrentGuessDisplay(value);
            this.updateSubmitButton(value);
        });
        
        // Handle Enter key
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && this.currentMode && !this.gameOver) {
                e.preventDefault();
                this.submitGuess();
            }
        });
    }
    
    startGame(mode, letters) {
        this.currentMode = mode;
        this.wordLength = letters;
        this.targetWord = this.getRandomWord(letters);
        this.guesses = [];
        this.triesLeft = this.maxTries;
        this.gameOver = false;
        this.letterStatus = {};
        
        console.log('Target word:', this.targetWord); // For debugging
        
        // Update UI
        document.getElementById('mode-selection').classList.add('hidden');
        document.getElementById('game-area').classList.remove('hidden');
        document.getElementById('game-over-modal').classList.add('hidden');
        
        // Set mode badge
        const modeBadge = document.getElementById('current-mode');
        modeBadge.className = 'mode-badge ' + mode;
        const modeNames = { easy: 'קל 🌟', medium: 'בינוני ⭐', hard: 'קשה 💫' };
        modeBadge.textContent = modeNames[mode];
        
        // Update tries
        document.getElementById('tries-left').textContent = this.triesLeft;
        
        // Clear message
        this.showMessage('');
        
        // Build the game board
        this.buildGuessesGrid();
        this.buildCurrentGuess();
        this.buildLetterStatus();
        
        // Clear and focus input
        const input = document.getElementById('guess-input');
        input.value = '';
        input.maxLength = letters;
        input.placeholder = `הקלד ${letters} אותיות...`;
        input.focus();
        
        this.updateSubmitButton('');
    }
    
    getRandomWord(length) {
        const words = window.GAME_WORDS[length];
        if (!words || words.length === 0) {
            console.error('No words found for length:', length);
            return 'שלום'.substring(0, length);
        }
        return words[Math.floor(Math.random() * words.length)];
    }
    
    buildGuessesGrid() {
        const grid = document.getElementById('guesses-grid');
        grid.innerHTML = '';
        
        for (let i = 0; i < this.maxTries; i++) {
            const row = document.createElement('div');
            row.className = 'guess-row';
            row.id = `guess-row-${i}`;
            
            for (let j = 0; j < this.wordLength; j++) {
                const tile = document.createElement('div');
                tile.className = 'guess-tile';
                tile.id = `tile-${i}-${j}`;
                row.appendChild(tile);
            }
            
            grid.appendChild(row);
        }
    }
    
    buildCurrentGuess() {
        const container = document.getElementById('current-guess');
        container.innerHTML = '';
        
        for (let i = 0; i < this.wordLength; i++) {
            const tile = document.createElement('div');
            tile.className = 'current-tile' + (i === 0 ? ' active' : '');
            tile.id = `current-${i}`;
            container.appendChild(tile);
        }
    }
    
    buildLetterStatus() {
        const container = document.getElementById('letter-status');
        container.innerHTML = '<div class="letter-status-header">מצב האותיות:</div>';
    }
    
    updateCurrentGuessDisplay(value) {
        const letters = value.split('');
        
        for (let i = 0; i < this.wordLength; i++) {
            const tile = document.getElementById(`current-${i}`);
            tile.textContent = letters[i] || '';
            tile.classList.toggle('filled', i < letters.length);
            tile.classList.toggle('active', i === letters.length);
        }
    }
    
    updateSubmitButton(value) {
        const btn = document.getElementById('submit-btn');
        btn.disabled = !value || value.length !== this.wordLength;
    }
    
    submitGuess() {
        const input = document.getElementById('guess-input');
        const guess = input.value;
        
        if (this.gameOver || guess.length !== this.wordLength) return;
        
        const result = this.checkGuess(guess);
        
        // Add to guesses history
        this.guesses.push({ word: guess, result: result });
        
        // Display the guess in the grid
        this.displayGuess(this.guesses.length - 1, guess, result);
        
        // Update letter status display
        this.updateLetterStatusDisplay(guess, result);
        
        // Check if won
        if (guess === this.targetWord) {
            this.gameOver = true;
            input.disabled = true;
            setTimeout(() => this.showWinModal(), 800);
            return;
        }
        
        // Decrease tries
        this.triesLeft--;
        document.getElementById('tries-left').textContent = this.triesLeft;
        
        // Check if lost
        if (this.triesLeft === 0) {
            this.gameOver = true;
            input.disabled = true;
            setTimeout(() => this.showLoseModal(), 800);
            return;
        }
        
        // Reset input
        input.value = '';
        this.updateCurrentGuessDisplay('');
        this.updateSubmitButton('');
        input.focus();
    }
    
    checkGuess(guess) {
        const result = [];
        const targetLetters = this.targetWord.split('');
        const guessLetters = guess.split('');
        const usedIndices = [];
        
        // First pass: find correct positions
        for (let i = 0; i < guessLetters.length; i++) {
            if (guessLetters[i] === targetLetters[i]) {
                result[i] = 'correct';
                usedIndices.push(i);
            }
        }
        
        // Second pass: find wrong positions
        for (let i = 0; i < guessLetters.length; i++) {
            if (result[i]) continue;
            
            let found = false;
            for (let j = 0; j < targetLetters.length; j++) {
                if (!usedIndices.includes(j) && guessLetters[i] === targetLetters[j]) {
                    result[i] = 'wrong-position';
                    usedIndices.push(j);
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                result[i] = 'wrong';
            }
        }
        
        return result;
    }
    
    displayGuess(rowIndex, guess, result) {
        const letters = guess.split('');
        
        letters.forEach((letter, i) => {
            setTimeout(() => {
                const tile = document.getElementById(`tile-${rowIndex}-${i}`);
                tile.textContent = letter;
                tile.className = 'guess-tile ' + result[i];
            }, i * 150);
        });
    }
    
    updateLetterStatusDisplay(guess, result) {
        const letters = guess.split('');
        
        letters.forEach((letter, i) => {
            const status = result[i];
            const currentStatus = this.letterStatus[letter];
            
            // Priority: correct > wrong-position > wrong
            if (status === 'correct') {
                this.letterStatus[letter] = 'correct';
            } else if (status === 'wrong-position' && currentStatus !== 'correct') {
                this.letterStatus[letter] = 'wrong-position';
            } else if (!currentStatus) {
                this.letterStatus[letter] = 'wrong';
            }
        });
        
        // Rebuild the status display
        const container = document.getElementById('letter-status');
        container.innerHTML = '<div class="letter-status-header">מצב האותיות:</div>';
        
        // Group by status
        const correct = [];
        const wrongPosition = [];
        const wrong = [];
        
        Object.entries(this.letterStatus).forEach(([letter, status]) => {
            if (status === 'correct') correct.push(letter);
            else if (status === 'wrong-position') wrongPosition.push(letter);
            else wrong.push(letter);
        });
        
        // Add correct letters
        correct.forEach(letter => {
            const span = document.createElement('span');
            span.className = 'letter-status-item correct';
            span.textContent = letter + ' ✓';
            container.appendChild(span);
        });
        
        // Add wrong position letters
        wrongPosition.forEach(letter => {
            const span = document.createElement('span');
            span.className = 'letter-status-item wrong-position';
            span.textContent = letter + ' ?';
            container.appendChild(span);
        });
        
        // Add wrong letters
        wrong.forEach(letter => {
            const span = document.createElement('span');
            span.className = 'letter-status-item wrong';
            span.textContent = letter + ' ✗';
            container.appendChild(span);
        });
    }
    
    showMessage(text, type = '') {
        const message = document.getElementById('message');
        message.textContent = text;
        message.className = 'message ' + type;
    }
    
    showWinModal() {
        const modal = document.getElementById('game-over-modal');
        const icon = document.getElementById('modal-icon');
        const title = document.getElementById('modal-title');
        const message = document.getElementById('modal-message');
        const wordReveal = document.getElementById('word-reveal');
        
        icon.textContent = '🎉';
        title.textContent = 'כל הכבוד!';
        title.className = 'win';
        
        const triesUsed = this.maxTries - this.triesLeft + 1;
        const messages = [
            'גאון! ניחשת ב-1 ניסיון!',
            'מדהים! ניחשת ב-2 ניסיונות!',
            'מעולה! ניחשת ב-3 ניסיונות!',
            'יפה מאוד! ניחשת ב-4 ניסיונות!',
            'טוב! ניחשת ב-5 ניסיונות!',
            'בדיוק בזמן! ניחשת ב-6 ניסיונות!'
        ];
        message.textContent = messages[triesUsed - 1];
        
        // Show the word
        wordReveal.innerHTML = '';
        this.targetWord.split('').forEach(letter => {
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = letter;
            wordReveal.appendChild(span);
        });
        
        modal.classList.remove('hidden');
        this.createConfetti();
    }
    
    showLoseModal() {
        const modal = document.getElementById('game-over-modal');
        const icon = document.getElementById('modal-icon');
        const title = document.getElementById('modal-title');
        const message = document.getElementById('modal-message');
        const wordReveal = document.getElementById('word-reveal');
        
        icon.textContent = '😢';
        title.textContent = 'לא הצלחת הפעם';
        title.className = 'lose';
        message.textContent = 'המילה הייתה:';
        
        // Show the word
        wordReveal.innerHTML = '';
        this.targetWord.split('').forEach(letter => {
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = letter;
            wordReveal.appendChild(span);
        });
        
        modal.classList.remove('hidden');
    }
    
    restartGame() {
        const input = document.getElementById('guess-input');
        input.disabled = false;
        this.startGame(this.currentMode, this.wordLength);
    }
    
    showModeSelection() {
        const input = document.getElementById('guess-input');
        input.disabled = false;
        
        document.getElementById('game-over-modal').classList.add('hidden');
        document.getElementById('game-area').classList.add('hidden');
        document.getElementById('mode-selection').classList.remove('hidden');
        
        this.currentMode = null;
        this.gameOver = false;
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

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    new HebrewWordGame();
});
