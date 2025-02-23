import catchrScene from "./catchr";
import HitCircle from "./HitCircle";

export default class Dot extends HitCircle {
  constructor(
    scene: catchrScene,
    radius: number,
    angle: number,
    speed: number = 50,
    type: string = "Dot"
  ) {
    super(scene, radius, angle, speed, type);
  }

  handleHit(scene: catchrScene): void {
    const effect = scene.add.sprite(this.x, this.y, "dotHit");
    effect.play("dotEffect");
    scene.sound.play("Hit", { volume: 0.025 });
    this.destroy();
    super.setHit(true);

    scene.updateScore(scene.score + 50 * scene.combo);
    scene.updateCombo(scene.combo + 1);
  }
}
