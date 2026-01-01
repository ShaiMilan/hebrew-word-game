// Main Navigation Controller

class GameNavigation {
    constructor() {
        this.init();
    }
    
    init() {
        // Main menu buttons
        document.getElementById('choose-word-game').addEventListener('click', () => this.showWordGame());
        document.getElementById('choose-venn-game').addEventListener('click', () => this.showVennGame());
        
        // Back buttons
        document.getElementById('word-game-back').addEventListener('click', () => this.showMainMenu());
        document.getElementById('venn-game-back').addEventListener('click', () => this.showMainMenu());
    }
    
    showMainMenu() {
        document.getElementById('main-menu').classList.remove('hidden');
        document.getElementById('word-game-container').classList.add('hidden');
        document.getElementById('venn-game-container').classList.add('hidden');
        
        // Hide any open modals
        document.getElementById('game-over-modal').classList.add('hidden');
        document.getElementById('venn-game-over-modal').classList.add('hidden');
    }
    
    showWordGame() {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('word-game-container').classList.remove('hidden');
        document.getElementById('venn-game-container').classList.add('hidden');
        
        // Reset to mode selection
        document.getElementById('mode-selection').classList.remove('hidden');
        document.getElementById('game-area').classList.add('hidden');
    }
    
    showVennGame() {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('word-game-container').classList.add('hidden');
        document.getElementById('venn-game-container').classList.remove('hidden');
        
        // Start a new Venn game
        if (window.vennGame) {
            window.vennGame.startNewGame();
        }
    }
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
    new GameNavigation();
});

