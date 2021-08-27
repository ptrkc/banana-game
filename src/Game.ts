import Player from "./Player";
import Drawable from "./Drawable";

export default class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  gameIntervalId: number;
  spawnIntervalId: number;
  player: Player;
  drawables: Drawable[];

  constructor(
    canvas: HTMLCanvasElement
  ) {
    this.canvas = canvas;
    this.canvas.height = 568
    this.canvas.width = 320
    this.context = this.canvas.getContext('2d');
    this.player = new Player(this.context, canvas.width/2-30);
    this.drawables = [];
  }

  start() {
    window.addEventListener("keydown", (e)=>this.handleKey(e));
    window.addEventListener("keyup", (e)=>this.handleKey(e));
    window.addEventListener("touchstart", (e)=>this.handleTouch(e));
    window.addEventListener("touchend", (e)=>this.handleTouch(e));
    this.drawables.push(this.player)
    this.startIntervals();
  }

  startIntervals() {
    const { setInterval } = window;
    this.gameIntervalId = setInterval(() => this.gameLoop(), 1000 / 60);
    this.spawnIntervalId = setInterval(() => this.spawnLoop(), 1000);
  }

  gameLoop() {
    this.updateState();
    this.renderGame();
  }

  spawnLoop(){
    console.log("chance to spawn fruits or bombs")
  }

  handleKey(e: KeyboardEvent){
    this.player.handleKey(e);
  }
  handleTouch(e: TouchEvent){
    this.player.handleTouch(e);
  }


  updateState() {
    this.drawables.forEach((drawable) => drawable.updateState(this));
  }

  renderGame() {
    this.clearScreen();
    this.drawables.forEach((drawable) => drawable.draw());
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
