/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { levelData, LevelJSON } from "@/types/levelData";

export default class catchrScene extends Phaser.Scene {
  private blob!: Phaser.GameObjects.Image;
  private hand!: Phaser.Physics.Arcade.Image;

  private levelData!: levelData;
  private levelJSON!: LevelJSON;

  private centerX!: number;
  private centerY!: number;
  private handDistance: number = 100;
  private isReversed: boolean = false;

  private hitCircles!: Phaser.GameObjects.Group;

  constructor() {
    super("catchrScene");
  }

  init(data: { levelData: levelData; levelJSON: LevelJSON }) {
    console.log("data", data);
    this.levelData = data.levelData;
    this.levelJSON = data.levelJSON;
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

    this.hand = this.physics.add.image(this.blob.x + this.handDistance, this.blob.y, "catchrHand");
    this.hand.setCircle(20, -10, 20);
    this.hand.setCollideWorldBounds(true);
    this.hand.setImmovable(false);

    this.input.on("pointermove", this.handlerMouseMove, this);

    this.hitCircles = this.physics.add.group();

    this.time.addEvent({
      delay: 100,
      callback: this.spawnHitCircle,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.overlap(this.hand, this.hitCircles, this.handleHit, undefined, this);
  }

  spawnHitCircle() {
    const radius = Phaser.Math.Between(200, 400);
    const angle = Phaser.Math.Between(0, Math.PI * 2);

    const x = this.centerX + Math.cos(angle) * radius;
    const y = this.centerY + Math.sin(angle) * radius;

    const hitCircle = this.add.circle(x, y, 30);
    hitCircle.setStrokeStyle(2, 0xffffff);
    hitCircle.setFillStyle(0x000000, 0);

    this.hitCircles.add(hitCircle);

    const speed = 50;
    const distance = Phaser.Math.Distance.Between(x, y, this.centerX, this.centerY);
    const duration = (distance / speed) * 1000;

    this.tweens.add({
      targets: hitCircle,
      x: this.centerX,
      y: this.centerY,
      duration: duration,
      ease: "Linear",
      onComplete: () => {
        hitCircle.destroy();
      },
    });
  }

  handleHit(hand: Phaser.GameObjects.GameObject, hitCircle: Phaser.GameObjects.GameObject) {
    hitCircle.destroy();
    console.log("Hit");
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
