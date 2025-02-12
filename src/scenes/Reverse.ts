import catchrScene from "./catchr";
import HitCircle from "./HitCircle";

export default class Reverse extends HitCircle {
  constructor(
    scene: catchrScene,
    radius: number,
    angle: number,
    speed: number = 50,
    type: string = "Reverse"
  ) {
    super(scene, radius, angle, speed, type);
  }

  handleHit(scene: catchrScene): void {
    const effect = scene.add.sprite(this.x, this.y, "reverseHit");
    effect.play("reverseEffect");

    super.setHit(true);
    this.destroy();
    scene.isReversed = true;
  }
}
