import {EnvironmentEssence} from "./EnvironmentEssence.js";

export class Footer extends EnvironmentEssence {
    constructor({imgSrc, canvasWidth, canvasHeight}) {
        super({
            id: 'footer',
            x: 0,
            canvasHeight,
            canvasWidth,
            imgSrc
        })
    }

    initSuccessCallback = () => {
        this.y = this.$canvasHeight - this.$img.height;
    }
}