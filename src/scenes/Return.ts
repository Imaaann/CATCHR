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
    scene.sound.play("Return", { volume: 0.05 });
    super.setHit(true);
    this.destroy();
    scene.isReversed = false;
    scene.clearHands();

    scene.updateScore(scene.score + 200 * scene.combo);
    scene.updateCombo(scene.combo + 1);
  }
}
