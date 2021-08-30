import FallingObject from './FallingObject';
import fruits from './fruits';

export default class Fruit extends FallingObject {
  constructor(
    context: CanvasRenderingContext2D,
    difficulty: number,
    id: number
  ) {
    super(context, difficulty, fruits[id].name);
    this.points = fruits[id].points;
  }
}
