import {EnvironmentEssence} from "./EnvironmentEssence.js";

export class Background extends EnvironmentEssence {
    constructor({imgSrc, canvasHeight, canvasWidth}) {
        super({
            id: 'background',
            x: 0,
            y: 0,
            canvasHeight,
            canvasWidth,
            imgSrc
        })
    }
}