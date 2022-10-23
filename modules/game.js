import WordField from "./word-field.js";
import Word from "./word.js";
import Selector from "./selector.js";
import {
    LETTERS_WRAPPER_ID,
    WORD_WRAPPER_ID,
    IMG_CLASS,
    WINS_COUNTER,
    LOSSES_COUNTER,
    LOST_STEP_OPACITY_STYLE,
    STEP_OPACITY_STYLE,
    LETTERS_START_STYLE,
    LETTERS_RESULT_STYLE,
    RESULT_STATMENT_FONT_SIZE_STYLE,
    WIN_TEXT,
    LOSE_TEXT,
    EMPTY_TEXT
} from "./statements.js";

export default class Game extends Selector {
    constructor() {
        super();

        this.wins = 0;
        this.losses = 0;

        this.currentStep = 0;
        this.lastStep = 3;

        this.wordField = new WordField();
        this.lengthOfWords = this.wordField.words.length;

        this.uniqueWords = [];

        this.generateWord();
        this.updateWordProperties();

        this.word = new Word(this.text);
    }

    generateWord() {
        let unique = false;
        while (!unique) {
            let num = Math.floor(Math.random() * this.wordField.words.length);
            if (this.uniqueWords.indexOf(num) === -1) {
                this.indexOfWord = num;
                this.uniqueWords.push(this.indexOfWord);
                unique = true;
            }
        }
    }

    updateWordProperties() {
        this.text = this.wordField.words[this.indexOfWord].text;
    }

    drawLetters() {
        for (let i = 0; i < 26; i++) {
            const label = (i + 10).toString(36);
            const button = this.createButton();
            button.textContent = label;
            button.disabled = false;
            button.addEventListener('click', (e) => this.guess(e, label));
            this.appendButton(LETTERS_WRAPPER_ID, button);
        }
    }

    drawWord() {
        const content = this.word.getContent();
        this.changeTextById(WORD_WRAPPER_ID, content)
    }

    updateStats() {
        this.changeTextByCSS(WINS_COUNTER, this.wins)
        this.changeTextByCSS(LOSSES_COUNTER, this.losses)
    }

    renderEndGame() {
        this.changeTextById(LETTERS_WRAPPER_ID, EMPTY_TEXT);
        this.getElement(LETTERS_WRAPPER_ID).style.textAlign = LETTERS_RESULT_STYLE;
        this.getElement(LETTERS_WRAPPER_ID).style.fontSize = RESULT_STATMENT_FONT_SIZE_STYLE;
        this.currentStep === this.lastStep ?
            (this.changeTextById(LETTERS_WRAPPER_ID, LOSE_TEXT), this.losses++) :
            (this.changeTextById(LETTERS_WRAPPER_ID, WIN_TEXT), this.wins++);
        this.updateStats();
    }

    checkState() {
        if (this.currentStep === this.lastStep || this.word.catched === true) {
            this.renderEndGame();
            this.reset()
        }
    }

    loseStep() {
        this.getElmentsByCSS(IMG_CLASS)[this.currentStep].style.opacity = LOST_STEP_OPACITY_STYLE;
    }

    guess(e, letter) {
        e.target.disabled = true;
        if (this.word.guess(letter)) {
            this.drawWord();
        } else {
            this.currentStep++;
            this.loseStep();
        }
        this.checkState();
    }

    reset() {
        setTimeout(() => {
            this.changeTextById(LETTERS_WRAPPER_ID, EMPTY_TEXT);
            this.currentStep = 0;

            let isGame = confirm('\nПродолжить ИГРУ?\n');

            if (!isGame) {
                alert(`ИГРА ЗАВЕРШЕНА!\n === Выигрышей ${this.wins}.\n === Проигрышей ${this.losses}.`);
            } else {

                this.generateWord();
                this.updateWordProperties();
                this.getElement(LETTERS_WRAPPER_ID).style.textAlign = LETTERS_START_STYLE;

                this.word = new Word(this.text);

                this.getElmentsByCSS(IMG_CLASS).forEach(item => item.style.opacity = STEP_OPACITY_STYLE);
                this.start();
            }
        }, 1000);
    }

    start() {
        this.loseStep();
        this.drawLetters();
        this.drawWord();
    }
}
