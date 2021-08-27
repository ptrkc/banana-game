import Player from './Player';
import Fruit from './Fruit';
import Drawable from './Drawable';

export default class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  gameIntervalId: number;
  spawnIntervalId: number;
  player: Player;
  drawables: Drawable[];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.height = 568;
    this.canvas.width = 320;
    this.context = this.canvas.getContext('2d');
    this.player = new Player(this.context, canvas.width / 2 - 30);
    this.drawables = [];
  }

  start() {
    window.addEventListener('keydown', (e) => this.handleKey(e));
    window.addEventListener('keyup', (e) => this.handleKey(e));
    window.addEventListener('touchstart', (e) => this.handleTouch(e));
    window.addEventListener('touchend', (e) => this.handleTouch(e));
    this.startIntervals();
  }

  startIntervals() {
    const { setInterval } = window;
    this.gameIntervalId = setInterval(() => this.gameLoop(), 1000 / 60);
    this.spawnIntervalId = setInterval(() => this.spawnLoop(), 1000);
  }

  gameLoop() {
    if (this.player.lives === 0) this.gameOver();
    this.updateState();
    this.renderGame();
  }

  spawnLoop() {
    let id;
    const random = Math.random();
    if (random <= 0.3) id = 0;
    if (random >= 0.3) id = 1;
    if (random >= 0.6) id = 2;
    if (random >= 0.8) id = 3;
    if (random >= 0.95) id = 4;
    if (Math.random() > 0.5) {
      this.drawables.push(new Fruit(this.context, id));
    }
  }

  handleKey(e: KeyboardEvent) {
    this.player.handleKey(e);
  }
  handleTouch(e: TouchEvent) {
    this.player.handleTouch(e);
  }

  updateState() {
    this.player.updateState()

    const newDrawables: Drawable[] = [];

    this.drawables.forEach((drawable) => {
      drawable.updateState(this);
      if(this.checkCollision(drawable)){
        if(drawable.name === "banana"){
          this.player.points *= 2
        }else{
          this.player.points += drawable.points
        }
        console.log(this.player.points)

      } else {
        if (drawable.y < 500) {
          newDrawables.push(drawable);
        } else {
          this.player.lives -= 1;
        }
      }
    });

    this.drawables = newDrawables;
  }

  checkCollision(drawable: Drawable){
    const xAligned = drawable.x > this.player.x - 45 && drawable.x < this.player.x + 45;
    const yAligned = drawable.y > this.player.y - 50;
    if( xAligned && yAligned){
      return true
    }
    return false
  }

  renderGame() {
    this.clearScreen();
    this.player.draw()
    this.drawables.forEach((drawable) => drawable.draw());
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  gameOver() {
    clearInterval(this.gameIntervalId);
    clearInterval(this.spawnIntervalId);
  }
}
