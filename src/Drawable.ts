import Game from "./Game";

export default interface Drawable {
  updateState(game: Game): void;
  draw(): void;
}
