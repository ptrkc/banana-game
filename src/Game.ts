import Player from './Player';
import Fruit from './Fruit';
import Bomb from './Bomb';
import FallingObject from './FallingObject';
import Board from './Board';

export default class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  gameIntervalId: number;
  spawnFruitIntervalId: number;
  spawnBombIntervalId: number;
  increaseDifficultyIntervalId: number;
  player: Player;
  board: Board;
  fallingObjects: FallingObject[];
  difficulty: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.height = 568;
    this.canvas.width = 320;
    this.context = this.canvas.getContext('2d');
    this.player = new Player(this.context, canvas.width / 2 - 30);
    this.board = new Board(this.context, canvas, this.player);
    this.fallingObjects = [];
    this.difficulty = 0;
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
    this.increaseDifficultyIntervalId = setInterval(
      () => this.increaseDifficultyLoop(),
      1000
    );
    this.spawnFruitIntervalId = setInterval(() => this.spawnFruitLoop(), 500);
    this.spawnBombIntervalId = setInterval(() => this.spawnBombLoop(), 1500);
  }

  gameLoop() {
    if (this.player.lives <= 0) this.gameOver();
    this.updateState();
    this.renderGame();
  }

  increaseDifficultyLoop() {
    this.difficulty++;
  }

  spawnFruitLoop() {
    if (Math.random() > 0.5) {
      this.fallingObjects.push(
        new Fruit(this.context, this.difficulty, this.randomFruitId())
      );
    }
  }

  randomFruitId() {
    const random = Math.random();
    if (random > 0.95) return 4;
    if (random > 0.8) return 3;
    if (random > 0.6) return 2;
    if (random > 0.3) return 1;
    return 0;
  }

  spawnBombLoop() {
    if (Math.random() > 0.5) {
      this.fallingObjects.push(new Bomb(this.context, this.difficulty));
    }
  }

  handleKey(e: KeyboardEvent) {
    this.player.handleKey(e);
  }
  handleTouch(e: TouchEvent) {
    this.player.handleTouch(e);
  }

  updateState() {
    this.player.updateState();
    this.updateFallingObjects();
  }

  updateFallingObjects() {
    const updatedFalingObjects: FallingObject[] = [];
    for (const fallingObject of this.fallingObjects) {
      if (this.player.checkCollision(fallingObject)) {
        this.player.handleCollision(fallingObject, this);
      } else {
        if (fallingObject.hitTheFloor) {
          if (fallingObject.name !== 'bomb') this.player.lives -= 1;
        } else {
          updatedFalingObjects.push(fallingObject);
        }
      }
      fallingObject.updateState();
    }
    this.fallingObjects = updatedFalingObjects;
  }

  renderGame() {
    this.clearScreen();
    this.player.draw();
    this.fallingObjects.forEach((fallingObject) => fallingObject.draw());
    this.board.draw();
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  gameOver() {
    clearInterval(this.gameIntervalId);
    clearInterval(this.increaseDifficultyIntervalId);
    clearInterval(this.spawnFruitIntervalId);
    clearInterval(this.spawnBombIntervalId);
  }
}
