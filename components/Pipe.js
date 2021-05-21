import {EnvironmentEssence} from "./EnvironmentEssence.js";

export class Pipe extends EnvironmentEssence {
    constructor({imgSrc, canvasHeight, canvasWidth}) {
        super({
            id: 'pipe',
            x: 0,
            y: 0,
            canvasHeight,
            canvasWidth,
            imgSrc
        })
    }
}