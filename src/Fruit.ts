import fruits from './fruits';

export default class Fruit {
  context;
  x;
  y;
  sprite;
  speed;
  difficulty;
  points;
  name;

  constructor(
    context: CanvasRenderingContext2D,
    id: number,
    difficulty: number
  ) {
    this.context = context;
    this.x = Math.floor(Math.random() * 251);
    this.y = -100;
    this.speed = 1;
    this.difficulty = difficulty;
    this.sprite = new Image();
    this.sprite.src = `./sprites/${fruits[id].name}.png`;
    this.points = fruits[id].points;
    this.name = fruits[id].name;
  }

  fall() {
    this.y += this.speed;
    this.increaseSpeed();
  }

  increaseSpeed() {
    this.speed += 0.015 + 0.005 * this.difficulty;
  }

  updateState() {
    this.fall();
  }

  draw() {
    this.context.drawImage(
      this.sprite,
      this.x,
      this.y,
      this.sprite.width / 14,
      this.sprite.height / 14
    );
  }
}
