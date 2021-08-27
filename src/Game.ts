import Player from "./Player";
import Fruit from "./Fruit";
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
    let id;
    const random = Math.random()
    if(random <= .3) id = 0
    if(random >= .3) id = 1
    if(random >= .6) id = 2
    if(random >= .8) id = 3
    if(random >= .95) id = 4
    if(Math.random() > .5){
      this.drawables.push(new Fruit(this.context, id))
    }
  }

  handleKey(e: KeyboardEvent){
    this.player.handleKey(e);
  }
  handleTouch(e: TouchEvent){
    this.player.handleTouch(e);
  }

  updateState() {
    const newDrawables: Drawable[] = []
    this.drawables.forEach((drawable) => {
      drawable.updateState(this);
      if(drawable.y < 500){
        newDrawables.push(drawable)
      }
    });
    this.drawables = newDrawables
  }

  renderGame() {
    this.clearScreen();
    this.drawables.forEach((drawable) => drawable.draw());
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
