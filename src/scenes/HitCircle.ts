export default class HitCircle extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, radius: number, angle: number, speed: number = 50) {
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

    super(scene, spawnX, spawnY, "hitCircle");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    scene.tweens.add({
      targets: this,
      x: endX,
      y: endY,
      duration: duration,
      ease: "linear",
      onComplete: () => {
        this.destroy();
      },
    });
  }

  handleHit() {
    this.destroy();
    console.log("You hit a generic hit circle!");
  }
}
