import Game from "./Game";

export default interface Drawable {
  x: number;
  y: number;
  points: number;
  name: string;
  updateState(game: Game): void;
  draw(): void;
}
