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
        this.turns = 0;

        this.currentStep = 0;
        this.lastStep = 4;

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
            let numb = Math.floor(Math.random() * this.wordField.words.length);
            if (this.uniqueWords.indexOf(numb) === -1) {
                this.indexOfWord = numb;
                this.uniqueWords.push(this.indexOfWord);
                unique = true;
            }
        }
    }

    updateWordProperties() {
        this.text = this.wordField.words[this.indexOfWord].text;
    }

    guess(e, letter) {
        e.target.disabled = true;
        if (this.word.guess(letter)) {
            this.drawWord();
        } else {
            this.currentStep++;
           // this.loseStep();
        }
        //this.checkState();
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

    start() {
        console.log("draw")
        this.drawLetters();
        this.drawWord();
    }
}
