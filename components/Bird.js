import {EnvironmentEssence} from "./EnvironmentEssence.js";

export class Bird extends EnvironmentEssence {
    defaultX = 10;
    defaultY = 150;
    constructor({imgSrc, audioSrc, canvasWidth, canvasHeight}) {
        super({
            id: 'bird',
            x: 10,
            y: 150,
            canvasHeight,
            canvasWidth,
            imgSrc,
            audioSrc
        });
        this.fly = 30;
    }

    up = () => {
        this.y -= this.fly;
        this.playSound();
    }

    reset = () => {
        this.x = this.defaultX;
        this.y = this.defaultY;
    }
}