import FallingObject from './FallingObject';

export default class Bomb extends FallingObject {
  constructor(context: CanvasRenderingContext2D, difficulty: number) {
    super(context, difficulty, 'bomb');
    this.spriteRatio = 4;
  }
}
