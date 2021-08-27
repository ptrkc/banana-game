import Game from "./Game";

const canvas = window.document.querySelector("#canvas") as HTMLCanvasElement;

const game = new Game(canvas);

game.start();
