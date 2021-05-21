import {loadAudio, loadImage} from "./utils.js";

export class EnvironmentEssence {
    constructor(config) {
        this.$canvasHeight = config.canvasHeight;
        this.$canvasWidth = config.canvasWidth;
        this.$img = null;
        this.sound = null;
        this.height = null;
        this.width = null;
        this.id = config.id;
        this.x = config.x;
        this.y = config.y;
        this.imgSrc = config.imgSrc;
        this.audioSrc = config.audioSrc;
        this._startConfig = {...config}
    }

    init = async () => {
        if (this.imgSrc) {
            this.$img = await loadImage(this.imgSrc);
            this.height = this.$img.height;
            this.width = this.$img.width;
        }

        if (this.audioSrc) {
            this.sound = await loadAudio(this.audioSrc);
        }

        this.initSuccessCallback();
    }

    playSound = () => {
        if (this.sound) {
            this.sound.play();
        }
    }

    toStartPosition = () => {
        this.x = this._startConfig.x;
        this.y = this._startConfig.y;
    }

    initSuccessCallback = () => {

    }
}