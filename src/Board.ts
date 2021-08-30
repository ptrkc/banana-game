import Player from './Player';

export default class Board {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  player;
  heartFull;
  heartEmpty;

  constructor(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    player: Player
  ) {
    this.canvas = canvas;
    this.player = player;
    this.context = context;
    this.heartFull = new Image();
    this.heartFull.src = './sprites/heart.png';
    this.heartEmpty = new Image();
    this.heartEmpty.src = './sprites/heart-empty.png';
  }

  drawBackground() {
    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, this.canvas.width, 60);
  }

  drawFloor() {
    this.context.fillStyle = '#FFFFFF';
    this.context.fillRect(
      10,
      this.canvas.height - 20,
      this.canvas.width - 20,
      1
    );
  }

  drawScore() {
    this.context.font = '20px Arial';
    this.context.fillStyle = '#FFFFFF';
    this.context.textAlign = 'right';
    this.context.fillText(
      `Score: ${this.player.points}`,
      this.canvas.width - 10,
      40
    );
  }

  drawFullHearts() {
    let i = 0;
    while (i < this.player.lives) {
      this.context.drawImage(
        this.heartFull,
        10 + (this.heartFull.width / 5) * i,
        10,
        this.heartFull.width / 5,
        this.heartFull.height / 5
      );
      i++;
    }
  }

  drawEmptyHearts() {
    let i = 0;
    while (i < 4) {
      this.context.drawImage(
        this.heartEmpty,
        10 + (this.heartEmpty.width / 5) * i,
        10,
        this.heartEmpty.width / 5,
        this.heartEmpty.height / 5
      );
      i++;
    }
  }
  draw() {
    this.drawBackground();
    this.drawScore();
    this.drawEmptyHearts();
    this.drawFullHearts();
    this.drawFloor();
  }
}
