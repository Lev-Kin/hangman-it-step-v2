import WordField from "./word-field.js";
import Word from "./word.js";
import Selector from "./selector.js";
import EndGame from "./end-game.js";
import {
    LETTERS_WRAPPER_ID,
    WORD_WRAPPER_ID,
    IMG_CLASS,
    LOST_STEP_OPACITY_STYLE,
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
        this.endGame = new EndGame();
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
        this.endGame.checkState();
    }

    start() {
        this.loseStep();
        this.drawLetters();
        this.drawWord();
    }
}
