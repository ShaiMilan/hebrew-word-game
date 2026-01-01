// Timing Game - Power Meter with Sweet Spot

class TimingGame {
    constructor() {
        this.maxRounds = 10;
        this.currentRound = 1;
        this.score = 0;
        this.gameOver = false;
        this.isRunning = false;
        
        // Meter settings
        this.meterPosition = 0; // 0 to 100
        this.meterDirection = 1; // 1 = right, -1 = left
        this.meterSpeed = 1.5; // Base speed
        this.sweetSpotStart = 40;
        this.sweetSpotEnd = 60;
        this.sweetSpotCenter = 50;
        
        this.animationId = null;
        this.lastTime = 0;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        document.getElementById('timing-hit-btn').addEventListener('click', () => this.hit());
        document.getElementById('timing-restart-btn').addEventListener('click', () => this.startNewGame());
        document.getElementById('timing-back-menu-btn').addEventListener('click', () => this.backToMenu());
        
        // Also allow spacebar to hit
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.isRunning && !this.gameOver) {
                e.preventDefault();
                this.hit();
            }
        });
    }
    
    startNewGame() {
        this.currentRound = 1;
        this.score = 0;
        this.gameOver = false;
        
        // Hide modal
        document.getElementById('timing-game-over-modal').classList.add('hidden');
        
        // Update UI
        this.updateUI();
        this.showResult('');
        
        // Start first round
        this.startRound();
    }
    
    startRound() {
        // Calculate difficulty for this round
        const difficulty = this.currentRound;
        
        // Speed increases with rounds
        this.meterSpeed = 1.5 + (difficulty * 0.3);
        
        // Sweet spot gets smaller with rounds
        const sweetSpotSize = Math.max(10, 25 - difficulty * 1.5);
        this.sweetSpotStart = 50 - sweetSpotSize / 2;
        this.sweetSpotEnd = 50 + sweetSpotSize / 2;
        this.sweetSpotCenter = 50;
        
        // Random starting position and direction
        this.meterPosition = Math.random() * 30; // Start near left
        this.meterDirection = 1;
        
        // Update sweet spot visual
        this.updateSweetSpot();
        
        // Enable button
        document.getElementById('timing-hit-btn').disabled = false;
        
        // Start animation
        this.isRunning = true;
        this.lastTime = performance.now();
        this.animate();
        
        // Update instruction
        document.getElementById('timing-instruction').textContent = 'לחץ כשהמחוג בתוך האזור הירוק!';
    }
    
    updateSweetSpot() {
        const sweetSpot = document.getElementById('sweet-spot');
        sweetSpot.style.left = this.sweetSpotStart + '%';
        sweetSpot.style.width = (this.sweetSpotEnd - this.sweetSpotStart) + '%';
    }
    
    animate() {
        if (!this.isRunning) return;
        
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 16.67; // Normalize to ~60fps
        this.lastTime = currentTime;
        
        // Move the meter
        this.meterPosition += this.meterDirection * this.meterSpeed * deltaTime;
        
        // Bounce off edges
        if (this.meterPosition >= 100) {
            this.meterPosition = 100;
            this.meterDirection = -1;
        } else if (this.meterPosition <= 0) {
            this.meterPosition = 0;
            this.meterDirection = 1;
        }
        
        // Update visual
        this.updateIndicator();
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    updateIndicator() {
        const indicator = document.getElementById('meter-indicator');
        indicator.style.left = `calc(${this.meterPosition}% - 4px)`;
    }
    
    hit() {
        if (!this.isRunning || this.gameOver) return;
        
        // Stop animation
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Disable button
        document.getElementById('timing-hit-btn').disabled = true;
        
        // Calculate score
        const position = this.meterPosition;
        let points = 0;
        let resultText = '';
        let resultClass = '';
        
        if (position >= this.sweetSpotStart && position <= this.sweetSpotEnd) {
            // In sweet spot - calculate how close to center
            const distanceFromCenter = Math.abs(position - this.sweetSpotCenter);
            const maxDistance = (this.sweetSpotEnd - this.sweetSpotStart) / 2;
            const accuracy = 1 - (distanceFromCenter / maxDistance);
            
            if (accuracy >= 0.9) {
                // Perfect!
                points = 100;
                resultText = '🎯 מושלם! +100';
                resultClass = 'perfect';
            } else if (accuracy >= 0.6) {
                // Good
                points = 75;
                resultText = '👍 מצוין! +75';
                resultClass = 'good';
            } else {
                // OK
                points = 50;
                resultText = '👌 טוב! +50';
                resultClass = 'ok';
            }
        } else {
            // Missed
            const distanceFromSpot = position < this.sweetSpotStart 
                ? this.sweetSpotStart - position 
                : position - this.sweetSpotEnd;
            
            if (distanceFromSpot <= 10) {
                points = 25;
                resultText = '😅 כמעט! +25';
                resultClass = 'ok';
            } else {
                points = 0;
                resultText = '❌ פספוס!';
                resultClass = 'miss';
            }
        }
        
        this.score += points;
        this.showResult(resultText, resultClass);
        this.updateUI();
        
        // Next round or end game
        setTimeout(() => {
            if (this.currentRound >= this.maxRounds) {
                this.endGame();
            } else {
                this.currentRound++;
                this.updateUI();
                this.showResult('');
                this.startRound();
            }
        }, 1200);
    }
    
    showResult(text, className = '') {
        const result = document.getElementById('timing-result');
        result.textContent = text;
        result.className = 'timing-result ' + className;
    }
    
    updateUI() {
        document.getElementById('timing-round').textContent = this.currentRound;
        document.getElementById('timing-max-rounds').textContent = this.maxRounds;
        document.getElementById('timing-score').textContent = this.score;
        
        // Update progress bar
        const progress = ((this.currentRound - 1) / this.maxRounds) * 100;
        document.getElementById('timing-progress-bar').style.width = progress + '%';
    }
    
    endGame() {
        this.gameOver = true;
        this.isRunning = false;
        
        const modal = document.getElementById('timing-game-over-modal');
        const icon = document.getElementById('timing-modal-icon');
        const title = document.getElementById('timing-modal-title');
        const message = document.getElementById('timing-modal-message');
        const finalScore = document.getElementById('timing-final-score');
        
        finalScore.textContent = this.score;
        
        // Determine result based on score
        const maxPossible = this.maxRounds * 100;
        const percentage = (this.score / maxPossible) * 100;
        
        if (percentage >= 80) {
            icon.textContent = '🏆';
            title.textContent = 'אלוף!';
            title.className = 'win';
            message.textContent = 'תזמון מושלם! אתה אמן!';
        } else if (percentage >= 60) {
            icon.textContent = '🎉';
            title.textContent = 'כל הכבוד!';
            title.className = 'win';
            message.textContent = 'הצלחה יפה!';
        } else if (percentage >= 40) {
            icon.textContent = '👍';
            title.textContent = 'לא רע!';
            title.className = '';
            message.textContent = 'אפשר לשפר, נסה שוב!';
        } else {
            icon.textContent = '💪';
            title.textContent = 'נסה שוב!';
            title.className = 'lose';
            message.textContent = 'תרגול עושה מושלם!';
        }
        
        modal.classList.remove('hidden');
        
        if (percentage >= 60) {
            this.createConfetti();
        }
    }
    
    backToMenu() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        document.getElementById('timing-game-over-modal').classList.add('hidden');
        document.getElementById('timing-game-container').classList.add('hidden');
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
window.timingGame = new TimingGame();

