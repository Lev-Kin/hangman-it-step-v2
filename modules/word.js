export default class Word {
    constructor(text) {
        this.text = text;
        this.guessed = [];
        this.catched = false;
    }

    getContent() {
        let content = '';
        for (const char of this.text) {
            if (char === " ") {
                content += char;
            } else {

                if (this.guessed.includes(char)) {
                    content += char;
                } else {
                    content += "_";
                }
            }
        }

        if (content === this.text) {
            this.catched = true;
        }

        return content;
    }

    guess(letter) {
        if (!this.text.includes(letter)) {
            return false;
        } else {
            this.guessed.push(letter);
            return true;
        }
    }
}

