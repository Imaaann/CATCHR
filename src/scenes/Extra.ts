import catchrScene from "./catchr";
import HitCircle from "./HitCircle";

export default class Extra extends HitCircle {
  constructor(
    scene: catchrScene,
    radius: number,
    angle: number,
    speed: number = 50,
    type: string = "Extra"
  ) {
    super(scene, radius, angle, speed, type);
  }

  handleHit(scene: catchrScene): void {
    const effect = scene.add.sprite(this.x, this.y, "extraHit");
    effect.play("extraEffect");
    scene.sound.play("Extra", { volume: 0.05 });
    super.setHit(true);
    this.destroy();
    scene.spawnHand();
  }
}
