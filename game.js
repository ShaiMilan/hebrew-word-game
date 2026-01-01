// Hebrew Word Guessing Game

class HebrewWordGame {
    constructor() {
        this.currentMode = null;
        this.wordLength = 0;
        this.targetWord = '';
        this.currentGuess = [];
        this.guesses = [];
        this.maxTries = 6;
        this.triesLeft = 6;
        this.gameOver = false;
        this.letterStatus = {};
        
        // Hebrew QWERTY keyboard layout (matches physical keyboard, without final letters)
        // Displayed RTL so we reverse the order to match physical keyboard visually
        this.keyboardLayout = [
            ['פ', 'ו', 'ט', 'א', 'ר', 'ק'],           // P O(ם→removed) I(ן→removed) U Y T R E
            ['ל', 'ח', 'י', 'ע', 'כ', 'ג', 'ד', 'ש'], // L K J H G F D S A
            ['ת', 'צ', 'מ', 'נ', 'ה', 'ב', 'ס', 'ז']  // . , M N B V C X Z
        ];
        
        // Map final letters to regular letters
        this.finalToRegular = {
            'ם': 'מ', 'ף': 'פ', 'ן': 'נ', 'ך': 'כ', 'ץ': 'צ'
        };
        
        this.init();
    }
    
    init() {
        this.bindModeSelection();
        this.bindKeyboard();
        this.bindButtons();
        document.addEventListener('keydown', (e) => this.handlePhysicalKeyboard(e));
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
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
        document.getElementById('change-mode-btn').addEventListener('click', () => this.showModeSelection());
    }
    
    bindKeyboard() {
        document.getElementById('keyboard').addEventListener('click', (e) => {
            if (e.target.classList.contains('key')) {
                const key = e.target.dataset.key;
                if (key === 'delete') {
                    this.deleteLetter();
                } else if (key === 'enter') {
                    this.submitGuess();
                } else {
                    this.addLetter(key);
                }
            }
        });
    }
    
    handlePhysicalKeyboard(e) {
        if (this.gameOver || !this.currentMode) return;
        
        const hebrewKeys = 'קראטופשדגכעיחלזסבהנמצת';
        const finalKeys = 'ןםךףץ';
        
        if (e.key === 'Backspace') {
            e.preventDefault();
            this.deleteLetter();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            this.submitGuess();
        } else if (hebrewKeys.includes(e.key)) {
            this.addLetter(e.key);
        } else if (finalKeys.includes(e.key)) {
            // Convert final letter to regular form
            this.addLetter(this.normalizeLetter(e.key));
        }
    }
    
    startGame(mode, letters) {
        this.currentMode = mode;
        this.wordLength = letters;
        this.targetWord = this.getRandomWord(letters);
        this.currentGuess = [];
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
        this.buildKeyboard();
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
    
    buildKeyboard() {
        const keyboard = document.getElementById('keyboard');
        keyboard.innerHTML = '';
        
        this.keyboardLayout.forEach((row, rowIndex) => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'keyboard-row';
            
            // Add delete key at the start of the last row
            if (rowIndex === 2) {
                const deleteKey = document.createElement('button');
                deleteKey.className = 'key special';
                deleteKey.dataset.key = 'delete';
                deleteKey.textContent = '⌫';
                rowDiv.appendChild(deleteKey);
            }
            
            row.forEach(letter => {
                const key = document.createElement('button');
                key.className = 'key';
                key.dataset.key = letter;
                key.textContent = letter;
                key.id = `key-${letter}`;
                rowDiv.appendChild(key);
            });
            
            // Add enter key at the end of the last row
            if (rowIndex === 2) {
                const enterKey = document.createElement('button');
                enterKey.className = 'key special enter';
                enterKey.dataset.key = 'enter';
                enterKey.textContent = '✓';
                rowDiv.appendChild(enterKey);
            }
            
            keyboard.appendChild(rowDiv);
        });
    }
    
    addLetter(letter) {
        if (this.gameOver || this.currentGuess.length >= this.wordLength) return;
        
        this.currentGuess.push(letter);
        this.updateCurrentRow();
    }
    
    deleteLetter() {
        if (this.gameOver || this.currentGuess.length === 0) return;
        
        this.currentGuess.pop();
        this.updateCurrentRow();
    }
    
    updateCurrentRow() {
        const rowIndex = this.guesses.length;
        for (let i = 0; i < this.wordLength; i++) {
            const tile = document.getElementById(`tile-${rowIndex}-${i}`);
            tile.textContent = this.currentGuess[i] || '';
            tile.classList.toggle('filled', i < this.currentGuess.length);
        }
    }
    
    submitGuess() {
        if (this.gameOver || this.currentGuess.length !== this.wordLength) {
            if (this.currentGuess.length < this.wordLength) {
                this.showMessage('השלם את כל האותיות!', 'error');
            }
            return;
        }
        
        const guess = this.currentGuess.join('');
        const result = this.checkGuess(guess);
        
        // Add to guesses history
        this.guesses.push({ word: guess, result: result });
        
        // Display the guess result
        this.displayGuessResult(this.guesses.length - 1, guess, result);
        
        // Update keyboard colors
        this.updateKeyboardColors(guess, result);
        
        // Check if won (using letter matching that treats final/regular as same)
        if (this.guessMatchesTarget(guess)) {
            this.gameOver = true;
            setTimeout(() => this.showWinModal(), 600);
            return;
        }
        
        // Decrease tries
        this.triesLeft--;
        document.getElementById('tries-left').textContent = this.triesLeft;
        
        // Check if lost
        if (this.triesLeft === 0) {
            this.gameOver = true;
            setTimeout(() => this.showLoseModal(), 600);
            return;
        }
        
        // Reset current guess
        this.currentGuess = [];
        this.showMessage('');
    }
    
    // Normalize letter - convert final letters to regular form
    normalizeLetter(letter) {
        return this.finalToRegular[letter] || letter;
    }
    
    // Check if two letters match (considering final/regular equivalence)
    lettersMatch(a, b) {
        return this.normalizeLetter(a) === this.normalizeLetter(b);
    }
    
    // Check if guess matches target (for win condition)
    guessMatchesTarget(guess) {
        if (guess.length !== this.targetWord.length) return false;
        for (let i = 0; i < guess.length; i++) {
            if (!this.lettersMatch(guess[i], this.targetWord[i])) {
                return false;
            }
        }
        return true;
    }
    
    checkGuess(guess) {
        const result = [];
        const targetLetters = this.targetWord.split('');
        const guessLetters = guess.split('');
        const usedIndices = [];
        
        // First pass: find correct positions
        for (let i = 0; i < guessLetters.length; i++) {
            if (this.lettersMatch(guessLetters[i], targetLetters[i])) {
                result[i] = 'correct';
                usedIndices.push(i);
            }
        }
        
        // Second pass: find wrong positions
        for (let i = 0; i < guessLetters.length; i++) {
            if (result[i]) continue;
            
            let found = false;
            for (let j = 0; j < targetLetters.length; j++) {
                if (!usedIndices.includes(j) && this.lettersMatch(guessLetters[i], targetLetters[j])) {
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
    
    displayGuessResult(rowIndex, guess, result) {
        const letters = guess.split('');
        
        letters.forEach((letter, i) => {
            setTimeout(() => {
                const tile = document.getElementById(`tile-${rowIndex}-${i}`);
                tile.textContent = letter;
                tile.classList.remove('filled');
                tile.classList.add(result[i]);
            }, i * 100);
        });
    }
    
    updateKeyboardColors(guess, result) {
        const letters = guess.split('');
        
        letters.forEach((letter, i) => {
            // Normalize the letter to find the key (final letters map to regular)
            const normalizedLetter = this.normalizeLetter(letter);
            const key = document.getElementById(`key-${normalizedLetter}`);
            if (!key) return;
            
            const status = result[i];
            const currentStatus = this.letterStatus[normalizedLetter];
            
            // Priority: correct > wrong-position > wrong
            if (status === 'correct') {
                this.letterStatus[normalizedLetter] = 'correct';
                key.className = 'key correct';
            } else if (status === 'wrong-position' && currentStatus !== 'correct') {
                this.letterStatus[normalizedLetter] = 'wrong-position';
                key.className = 'key wrong-position';
            } else if (!currentStatus) {
                this.letterStatus[normalizedLetter] = 'wrong';
                key.className = 'key wrong';
            }
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
        this.startGame(this.currentMode, this.wordLength);
    }
    
    showModeSelection() {
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
