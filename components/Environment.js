import {Bird} from "./Bird.js";
import {Background} from "./Background.js";
import {Pipe} from "./Pipe.js";
import {Footer} from "./Footer.js";
import {Score} from "./Score.js";
import {MEDIA_SRC, AUDIO_SRC, PHYSICS, ENVIRONMENT_MEASURE, SCORE_STYLES} from "./configs.js"

export class Environment {
    constructor(canvas) {
        this.$el = canvas;
        this.context = canvas.getContext('2d');
        this._bird = null;
        this._bg = null;
        this._pipe_top = null;
        this._pipe_bottom = null;
        this._footer = null;
        this._score = null;
        this._resetPipePosition();
    }

    get characters() {
        return [this._bg, this._footer, this._bird, this._pipe_top, this._pipe_bottom, this._score];
    }

    init = async () => {
        this._createCharacters();
        await this._initCharactersMedia();
        document.addEventListener('mousedown', this._bird.up);
    }

    reset = () => {
        this._clear();
        this._resetPipePosition();
        this._score.reset();
        this._bird.reset();
    }

    draw = (img, position) => {
        this.context.drawImage(img, ...position);
    }

    start = async () => {
        this.draw(this._bg.$img, [this._bg.x, this._bg.y])

        this.pipe_positions.forEach(position => {
            const {x, y} = position;

            this._renderPipes(x, y);

            position.x--;

            if (this._isCrossBarrier(x, y)) {
                window.cancelAnimationFrame(this.start);
                this._gameOver();
            }

            if (x === this._bird.width) {
                this._score.increase();
            }
        })

        this.draw(this._footer.$img, [this._footer.x, this._footer.y]);
        this.draw(this._bird.$img, [this._bird.x, this._bird.y]);

        this._gravBird();
        this._score.create();
        requestAnimationFrame(this.start);
    }

    _clear = () => this.context.clearRect(0, 0, this.$el.width, this.$el.height);

    _gameOver = () => {
        alert('You lose');
        this.reset();
    }
    
    _createCharacters = () => {
        const base = {
            canvasWidth: this.$el.width,
            canvasHeight: this.$el.height
        }
        this._bg = new Background({imgSrc: MEDIA_SRC.background, ...base});
        this._footer = new Footer({imgSrc: MEDIA_SRC.footer, ...base});
        this._bird = new Bird({imgSrc: MEDIA_SRC.bird, audioSrc: AUDIO_SRC.fly, ...base});
        this._pipe_top = new Pipe({imgSrc: MEDIA_SRC.pipe_top, ...base});
        this._pipe_bottom = new Pipe({imgSrc: MEDIA_SRC.pipe_bottom, ...base});
        this._score = new Score({audioSrc: AUDIO_SRC.score, context: this.context, ...base, ...SCORE_STYLES});
    }

    _initCharactersMedia = async () => {
        await Promise.all(this.characters.map(async (character) => await character.init()));
    }

    _isCrossBarrier = (x, y) => (this._isBirdXInPipe(x) && this._isBirdYInPipe(y)) || this._isBirdInFooter();

    _isBirdXInPipe = (pipeX) => {
        return this._bird.x + this._bird.width >= pipeX && this._bird.x <= pipeX + this._pipe_top.width;
    }

    _isBirdYInPipe = (pipeY) => {
        const isInTop = this._bird.y + this._bird.height >= pipeY + this._pipe_top.height + ENVIRONMENT_MEASURE.pipeGap;
        const isInBottom = this._bird.y <= pipeY + this._pipe_top.height;
        return isInTop || isInBottom;
    }

    _isBirdInFooter = () => {
        return this._bird.y + this._bird.height >= this.$el.height - this._footer.height;
    }

    _gravBird = () => {
        this._bird.y += PHYSICS.grav;
    }

    _renderPipes = (x, y) => {
        this._drawPipes(x, y);

        if (x === ENVIRONMENT_MEASURE.pipeRender) {
            this._createPipePosition();
        }
    }

    _drawPipes = (x, y) => {
        const top = this._pipe_top.$img;
        const bottom = this._pipe_bottom.$img;

        this.draw(top, [x, y]);
        this.draw(bottom, [x, y + top.height + ENVIRONMENT_MEASURE.pipeGap]);
    }

    _createPipePosition = () => {
        const {height} = this._pipe_top.$img;

        this.pipe_positions.push({
            x: this.$el.width,
            y: Math.floor(Math.random() * height) - height
        })
    }

    _resetPipePosition = () => {
        this.pipe_positions = [{
            x: this.$el.width,
            y: 0
        }];
    }
}