import catchrScene from "./catchr";
import HitCircle from "./HitCircle";

export default class Return extends HitCircle {
  constructor(
    scene: catchrScene,
    radius: number,
    angle: number,
    speed: number = 50,
    type: string = "Return"
  ) {
    super(scene, radius, angle, speed, type);
  }

  handleHit(scene: catchrScene): void {
    const effect = scene.add.sprite(this.x, this.y, "returnHit");
    effect.play("returnEffect");
    this.destroy();
    scene.isReversed = false;
  }
}
