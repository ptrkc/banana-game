export default class FallingObject {
  context;
  x;
  y;
  sprite;
  spriteRatio;
  speed;
  difficulty;
  points;
  name;
  hitTheFloor;

  constructor(
    context: CanvasRenderingContext2D,
    difficulty: number,
    sprite: string
  ) {
    this.context = context;
    this.x = Math.floor(Math.random() * 251);
    this.y = -100;
    this.speed = 1;
    this.difficulty = difficulty;
    this.points = 0;
    this.sprite = new Image();
    this.sprite.src = `./sprites/${sprite}.png`;
    this.spriteRatio = 14;
    this.name = sprite;
    this.hitTheFloor = false;
  }

  fall() {
    this.y += this.speed;
    this.increaseSpeed();
  }

  increaseSpeed() {
    this.speed += 0.015 + 0.005 * this.difficulty;
  }

  updateState() {
    if (this.y > 480) this.hitTheFloor = true;
    this.fall();
  }

  draw() {
    this.context.drawImage(
      this.sprite,
      this.x,
      this.y,
      this.sprite.width / this.spriteRatio,
      this.sprite.height / this.spriteRatio
    );
  }
}
