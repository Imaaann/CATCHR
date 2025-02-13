import catchrScene from "./catchr";
import HitCircle from "./HitCircle";

export default class Mine extends HitCircle {
  constructor(
    scene: catchrScene,
    radius: number,
    angle: number,
    speed: number = 50,
    type: string = "Mine"
  ) {
    super(scene, radius, angle, speed, type, () => {
      this.destroy();
    });
  }

  handleHit(scene: catchrScene): void {
    const effect = scene.add.sprite(this.x, this.y, "mineHit");
    effect.play("mineEffect");
    scene.sound.play("Explode", { volume: 0.2 });
    this.destroy();
    scene.updateCombo(1);
    scene.updateHealthBar(-15);
  }
}
