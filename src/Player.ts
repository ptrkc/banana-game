import FallingObject from './FallingObject';
import Game from './Game';

export default class Player {
  context;
  x;
  y;
  sprite;
  movingLeft;
  movingRight;
  lives;
  points;

  constructor(context: CanvasRenderingContext2D, initialX: number) {
    this.context = context;
    this.x = initialX;
    this.y = 460;
    this.movingLeft = false;
    this.movingRight = false;
    this.sprite = new Image();
    this.sprite.src = './sprites/alien.png';
    this.lives = 4;
    this.points = 0;
  }

  move() {
    if (this.movingLeft && this.x > 0) this.x += -5;
    if (this.movingRight && this.x < 260) this.x += 5;
  }

  handleKey(e: KeyboardEvent) {
    if (e.type === 'keydown') {
      if (e.code === 'ArrowRight') this.movingRight = true;
      if (e.code === 'ArrowLeft') this.movingLeft = true;
    } else if (e.type === 'keyup') {
      if (e.code === 'ArrowRight') this.movingRight = false;
      if (e.code === 'ArrowLeft') this.movingLeft = false;
    }
  }

  handleTouch(e: TouchEvent) {
    if (e.type === 'touchstart') {
      if (e.touches[0].clientX > window.innerWidth / 2) this.movingRight = true;
      if (e.touches[0].clientX < window.innerWidth / 2) this.movingLeft = true;
    } else if (e.type === 'touchend') {
      this.movingRight = false;
      this.movingLeft = false;
    }
  }

  checkCollision(fallingObject: FallingObject) {
    const xAligned =
      fallingObject.x > this.x - 45 && fallingObject.x < this.x + 45;
    const yAligned = fallingObject.y > this.y - 50;
    return xAligned && yAligned ? true : false;
  }

  handleFruitCollision(fallingObject: FallingObject) {
    if (fallingObject.name === 'banana') {
      this.points *= 2;
    } else {
      this.points += fallingObject.points;
    }
  }

  updateState(game: Game) {
    if (this.movingLeft || this.movingRight) this.move();
    if (this.lives <= 0) game.isOver = true;
  }

  draw() {
    this.context.drawImage(
      this.sprite,
      this.x,
      this.y,
      this.sprite.width / 4,
      this.sprite.height / 4
    );
  }
}
