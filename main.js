// Main Navigation Controller

class GameNavigation {
    constructor() {
        this.init();
    }
    
    init() {
        // Main menu buttons
        document.getElementById('choose-word-game').addEventListener('click', () => this.showWordGame());
        document.getElementById('choose-venn-game').addEventListener('click', () => this.showVennGame());
        document.getElementById('choose-timing-game').addEventListener('click', () => this.showTimingGame());
        
        // Back buttons
        document.getElementById('word-game-back').addEventListener('click', () => this.showMainMenu());
        document.getElementById('venn-game-back').addEventListener('click', () => this.showMainMenu());
        document.getElementById('timing-game-back').addEventListener('click', () => this.showMainMenu());
    }
    
    showMainMenu() {
        document.getElementById('main-menu').classList.remove('hidden');
        document.getElementById('word-game-container').classList.add('hidden');
        document.getElementById('venn-game-container').classList.add('hidden');
        document.getElementById('timing-game-container').classList.add('hidden');
        
        // Hide any open modals
        document.getElementById('game-over-modal').classList.add('hidden');
        document.getElementById('venn-game-over-modal').classList.add('hidden');
        document.getElementById('timing-game-over-modal').classList.add('hidden');
        
        // Stop timing game if running
        if (window.timingGame) {
            window.timingGame.isRunning = false;
        }
    }
    
    showWordGame() {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('word-game-container').classList.remove('hidden');
        document.getElementById('venn-game-container').classList.add('hidden');
        document.getElementById('timing-game-container').classList.add('hidden');
        
        // Reset to mode selection
        document.getElementById('mode-selection').classList.remove('hidden');
        document.getElementById('game-area').classList.add('hidden');
    }
    
    showVennGame() {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('word-game-container').classList.add('hidden');
        document.getElementById('venn-game-container').classList.remove('hidden');
        document.getElementById('timing-game-container').classList.add('hidden');
        
        // Start a new Venn game
        if (window.vennGame) {
            window.vennGame.startNewGame();
        }
    }
    
    showTimingGame() {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('word-game-container').classList.add('hidden');
        document.getElementById('venn-game-container').classList.add('hidden');
        document.getElementById('timing-game-container').classList.remove('hidden');
        
        // Start a new Timing game
        if (window.timingGame) {
            window.timingGame.startNewGame();
        }
    }
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
    new GameNavigation();
});
