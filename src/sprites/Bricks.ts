import { Vector } from "~/types";

export class Brick {
  private brickImage: HTMLImageElement = new Image();
  // instate define the here we can do it in the constructor
  constructor(
    private brickWidth: number,
    private brickHeight: number,
    private position: Vector,
    private brickEnergy: number,
    image: string
  ) {
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.brickEnergy = brickEnergy;
    this.position = position;
    this.brickImage.src = image;
  }

  // getters
  get width(): number {
    return this.brickWidth;
  }
  get height(): number {
    return this.brickHeight;
  }
  get pos(): Vector {
    return this.position;
  }
  get image(): HTMLImageElement {
    return this.brickImage;
  }
  get energy(): number {
    return this.brickEnergy;
  }

  // setters
  set energy(energy: number) {
    this.brickEnergy = energy;
  }
}
