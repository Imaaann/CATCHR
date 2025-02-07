/* eslint-disable @typescript-eslint/no-unused-vars */

export default class catchrScene extends Phaser.Scene {
  private blob!: Phaser.GameObjects.Image;
  private hand!: Phaser.GameObjects.Image;
  private centerX!: number;
  private centerY!: number;
  private handDistance: number = 100;
  private isReversed: boolean = true;
  constructor() {
    super("catchrScene");
  }

  preload() {
    this.load.svg("catchrHead", "/svg/CatchrHead.svg", { width: 60, height: 60 });
    this.load.svg("catchrHand", "/svg/CatchrHand.svg", { width: 22, height: 80 });
  }

  create() {
    const { height, width } = this.sys.game.canvas;
    this.centerX = width / 2;
    this.centerY = height / 2;

    this.blob = this.add.image(this.centerX, this.centerY, "catchrHead");
    this.hand = this.add.image(this.blob.x + this.handDistance, this.blob.y, "catchrHand");

    this.input.on("pointermove", this.handlerMouseMove, this);
  }

  handlerMouseMove(pointer: Phaser.Input.Pointer) {
    const mouseX = pointer.x;
    const mouseY = pointer.y;

    const dx = mouseX - this.centerX;
    const dy = mouseY - this.centerY;
    let angle = Math.atan2(dy, dx);
    angle = this.isReversed ? angle + Math.PI : angle;

    this.hand.setPosition(
      this.centerX + Math.cos(angle) * this.handDistance,
      this.centerY + Math.sin(angle) * this.handDistance
    );

    this.hand.setRotation(angle);
  }

  update(time: number, delta: number): void {
    // Do shit at 60fps
  }
}
