import {Environment} from "./components/Environment.js";

const game = new Environment(document.querySelector('#canvas'));
await game.init();
await game.start();
