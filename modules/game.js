import Selector from "./selector.js";
import WordField from "./word-field.js";

export default class Game extends Selector {
    constructor() {
        super();

        this.wins = 0;
        this.losses = 0;
        this.turns = 0;

        this.currentStep = 0;
        this.lastStep = 4;

        this.wordField = new WordField();
        this.lengthOfWordes = this.wordField.wordes.length;

        this.uniqueWordes = [];
    }

    draw() {

    }

    start() {
        console.log("draw")
    }
}
