import catchrScene from "./catchr";

type onCompleteType = () => void;
export default class HitCircle extends Phaser.Physics.Arcade.Image {
  private isHit: boolean = false;

  constructor(
    scene: catchrScene,
    radius: number,
    angle: number,
    speed: number = 50,
    type: string = "hitCircle",
    onComplete: onCompleteType = () => {
      this.destroy();
      if (!this.isHit) {
        scene.updateCombo(1);
        scene.updateHealthBar(-10);
      }
    }
  ) {
    const centerX = scene.scale.width / 2;
    const centerY = scene.scale.height / 2;
    const angleRad = Phaser.Math.DegToRad(angle);

    const spawnX = centerX + radius * Math.cos(angleRad);
    const spawnY = centerY + radius * Math.sin(angleRad);

    const stopRadius = 80;
    const endX = centerX + stopRadius * Math.cos(angleRad);
    const endY = centerY + stopRadius * Math.sin(angleRad);

    const distance = Phaser.Math.Distance.Between(spawnX, spawnY, centerX, centerY);
    const duration = (distance / speed) * 1000;

    super(scene, spawnX, spawnY, type);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    scene.tweens.add({
      targets: this,
      x: endX,
      y: endY,
      duration: duration,
      ease: "linear",
      onComplete: onComplete,
    });
  }

  handleHit(scene: catchrScene) {
    const effect = scene.add.sprite(this.x, this.y, "hitCircleHit");
    effect.play("hitCircleEffect");
    scene.sound.play("Hit", { volume: 0.05 });
    this.destroy();
    this.isHit = true;
    scene.updateScore(scene.score + 100 * scene.combo);
    scene.updateCombo(scene.combo + 1);
  }

  setHit(val: boolean) {
    this.isHit = val;
  }
}
