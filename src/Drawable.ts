import Game from "./Game";

export default interface Drawable {
  y: number;
  updateState(game: Game): void;
  draw(): void;
}
