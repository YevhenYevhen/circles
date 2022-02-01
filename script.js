const body = document.querySelector('body');
const startButton = document.querySelector('.start-button');
const playAgainButton = document.querySelector('.play-again-button');
const circleContainer = document.querySelector('.circle-container');
const circle = document.querySelector('.circle');
const timerParagraph = document.querySelector('.timer-paragraph');
const countParagraph = document.querySelector('.count-paragraph');
const endScreen = document.querySelector('.end-screen');

class CircleGame {
    count = 0;
    winningResult = 15;
    generateRGBColor() {
        const r = Math.floor(Math.random() * 250);
        const g = Math.floor(Math.random() * 250);
        const b = Math.floor(Math.random() * 250);
        return `rgb(${r},${g},${b})`;
    }
    generateCircle(min, max) {
        const size = Math.floor(Math.random() * (max - min + 1) + min);
        const offsetTop = Math.floor(Math.random() * 600);
        const offsetLeft = Math.floor(Math.random() * 1000);
        const newCircle = document.createElement('div');
        newCircle.setAttribute('class', 'circle');
        newCircle.style.cssText = `height: ${size}px; width: ${size}px; 
        background-color: ${this.generateRGBColor()}; top: ${offsetTop}px; left: ${offsetLeft}px;`;
        return newCircle;
    }
    setTimer() {
        this.timer = Date.now();
    }
    incrementCount() {
        this.count += 1;
    }
    addCircle(circle) {
        circleContainer.replaceChildren(circle);
        circle.addEventListener('click', () => this.handleClick());
    }
    handleClick() {
        this.incrementCount();
        const end = Date.now();
        this.addCircle(this.generateCircle(40, 200));
        const elapsed = ((end - this.timer) / 1000).toFixed(2);
        timerParagraph.textContent = `It took you ${elapsed} seconds!`;
        this.controlGame(elapsed);
        this.setTimer();
        countParagraph.textContent = `Your score: ${this.count}`;
    }
    controlGame(elapsed) {
        if (elapsed > 1) {
            endScreen.querySelector('p').textContent = `You've scored ${this.count} 
            point${this.count === 1 ? '' : 's'} but you were too slow :(`
            this.resetGame();
            toggleEndScreen();
        }
        if (this.count === this.winningResult) {
            endScreen.querySelector('p').textContent = `You've scored ${this.count} points and won! :)`
            this.resetGame();
            toggleEndScreen();
        }
    }
    resetGame() {
        this.count = 0;
        this.setTimer();
        timerParagraph.textContent = '';
    }
    initGame() {
        this.setTimer();
        this.addCircle(this.generateCircle(40, 200));
    }
}

const newGame = new CircleGame();

function hideStartScreen() {
    const startScreen = document.querySelector('.start-screen');
    startScreen.setAttribute('class', 'hide');
}

function toggleEndScreen() {
    endScreen.toggleAttribute('hidden');
}

function playAgain() {
    endScreen.toggleAttribute('hidden');
    newGame.resetGame();
    setTimeout(() => newGame.initGame.bind(newGame), 3000);
}

startButton.addEventListener('click', newGame.initGame.bind(newGame));
startButton.addEventListener('click', hideStartScreen);
circle.addEventListener('click', newGame.handleClick);
playAgainButton.addEventListener('click', playAgain);
