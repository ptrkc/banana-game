import Player from './Player';
import Fruit from './Fruit';
import Bomb from './Bomb';
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
  fruits: Fruit[];
  bombs: Bomb[];
  difficulty: number;
  isOver: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.height = 568;
    this.canvas.width = 320;
    this.context = this.canvas.getContext('2d');
    this.player = new Player(this.context, canvas.width / 2 - 30);
    this.board = new Board(this.context, canvas, this.player);
    this.fruits = [];
    this.bombs = [];
    this.difficulty = 0;
    this.isOver = false;
  }

  start() {
    window.addEventListener('keydown', (e) => this.handleKey(e));
    window.addEventListener('keyup', (e) => this.handleKey(e));
    window.addEventListener('touchstart', (e) => this.handleTouch(e));
    window.addEventListener('touchend', (e) => this.handleTouch(e));
    this.startIntervals();
  }

  restart() {
    this.isOver = false;
    this.fruits = [];
    this.bombs = [];
    this.difficulty = 0;
    this.player = new Player(this.context, this.canvas.width / 2 - 30);
    this.board = new Board(this.context, this.canvas, this.player);
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
    this.spawnBombIntervalId = setInterval(() => this.spawnBombLoop(), 1400);
  }

  gameLoop() {
    this.updateState();
    this.renderGame();
    if (this.isOver) this.gameOver();
  }

  increaseDifficultyLoop() {
    this.difficulty++;
  }

  spawnFruitLoop() {
    if (Math.random() > 0.5) {
      this.fruits.push(
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
      this.bombs.push(new Bomb(this.context, this.difficulty));
    }
  }

  handleKey(e: KeyboardEvent) {
    this.player.handleKey(e);
  }
  handleTouch(e: TouchEvent) {
    this.player.handleTouch(e);
  }

  updateState() {
    this.player.updateState(this);
    this.updateFruits();
    this.updateBombs();
  }

  updateFruits() {
    const updatedFruits: Fruit[] = [];

    for (const fruit of this.fruits) {
      if (this.player.checkCollision(fruit)) {
        this.player.handleFruitCollision(fruit);
      } else {
        if (fruit.hitTheFloor) {
          this.player.lives -= 1;
        } else {
          updatedFruits.push(fruit);
        }
      }
      fruit.updateState();
    }
    this.fruits = updatedFruits;
  }

  updateBombs() {
    const updatedBombs: Bomb[] = [];
    for (const bomb of this.bombs) {
      if (this.player.checkCollision(bomb)) {
        this.isOver = true;
      } else {
        if (!bomb.hitTheFloor) {
          updatedBombs.push(bomb);
        }
      }
      bomb.updateState();
    }
    this.bombs = updatedBombs;
  }

  renderGame() {
    this.clearScreen();
    this.player.draw();
    this.fruits.forEach((fruit) => fruit.draw());
    this.bombs.forEach((bomb) => bomb.draw());
    this.board.draw();
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  gameOver() {
    this.drawGameOver();
    clearInterval(this.gameIntervalId);
    clearInterval(this.increaseDifficultyIntervalId);
    clearInterval(this.spawnFruitIntervalId);
    clearInterval(this.spawnBombIntervalId);
    setTimeout(() => {
      this.restart();
    }, 3000);
  }

  drawGameOver() {
    this.context.font = '30px Arial';
    this.context.fillStyle = '#FFFFFF';
    this.context.textAlign = 'center';
    this.context.fillText(
      `Game over`,
      this.canvas.width / 2,
      this.canvas.height / 2
    );
  }
}
