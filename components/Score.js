import {EnvironmentEssence} from "./EnvironmentEssence.js";

export class Score extends EnvironmentEssence {
    constructor({audioSrc, canvasWidth, canvasHeight, context, fillStyle, font}) {
        super({
            x: 10,
            y: canvasHeight - 20,
            id: 'score',
            audioSrc,
            canvasHeight,
            canvasWidth
        });

        this.context = context
        this.fillStyle = fillStyle
        this.font = font
        this.score = 0;
    }

    create = () => {
        this.context.fillStyle = this.fillStyle;
        this.context.font = this.font;
        this.context.fillText(`Score: ${this.score}`, this.x, this.y);
    }

    increase = () => {
        this.score++;
        this.playSound();
    }

    reset = () => {
        this.score = 0;
    }
}