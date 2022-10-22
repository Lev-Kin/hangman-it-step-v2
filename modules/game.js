
export default class Game extends Selection {
    constructor() {

        this.wins = 0;
        this.losses = 0;
        this.turns = 0;

        this.currentStep = 0;
        this.lastStep = 4;
    }

    draw() {

    }

    start() {
        console.log("draw")
    }
}
