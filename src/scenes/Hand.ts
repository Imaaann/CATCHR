import catchrScene from "./catchr";

export default class Hand extends Phaser.Physics.Arcade.Image {
  private angleOffset!: number;
  private center!: { x: number; y: number };
  private handDistance!: number;

  constructor(scene: catchrScene, index: number) {
    const centerX = scene.scale.width / 2;
    const centerY = scene.scale.height / 2;
    const count = scene.handCount;
    const angleOffset = (index / count) * (2 * Math.PI);

    const spawnX = centerX + Math.cos(angleOffset) * scene.handDistance;
    const spawnY = centerY + Math.sin(angleOffset) * scene.handDistance;

    super(scene, spawnX, spawnY, "catchrHand");
    this.angleOffset = angleOffset;
    this.center = { x: centerX, y: centerY };
    this.handDistance = scene.handDistance;
    this.setRotation(angleOffset);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCircle(18, -8, 22);
  }

  move(pointer: Phaser.Input.Pointer, scene: catchrScene) {
    const mouseX = pointer.x;
    const mouseY = pointer.y;

    const dx = mouseX - this.center.x;
    const dy = mouseY - this.center.y;
    let angle = Math.atan2(dy, dx) + this.angleOffset;
    angle = scene.isReversed ? angle + Math.PI : angle;

    this.setPosition(
      this.center.x + Math.cos(angle) * scene.handDistance,
      this.center.y + Math.sin(angle) * scene.handDistance
    );
    this.setRotation(angle);
  }

  updateAngle(index: number, count: number) {
    this.angleOffset = (index / count) * (2 * Math.PI);
  }

  remove() {
    this.destroy();
  }
}
