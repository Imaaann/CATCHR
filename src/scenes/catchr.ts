/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { levelData, LevelJSON } from "@/types/levelData";
import HitCircle from "./HitCircle";
import { createLocalRequestContext } from "next/dist/server/after/builtin-request-context";

export default class catchrScene extends Phaser.Scene {
  private blob!: Phaser.GameObjects.Image;
  private hand!: Phaser.Physics.Arcade.Image;

  private levelData!: levelData;
  private levelJSON!: LevelJSON;

  private centerX!: number;
  private centerY!: number;
  private handDistance: number = 120;
  private isReversed: boolean = false;

  private hitCircles!: Phaser.Physics.Arcade.Group;

  constructor() {
    super("catchrScene");
  }

  init(data: { levelData: levelData; levelJSON: LevelJSON }) {
    console.log("data", data);
    this.levelData = data.levelData;
    this.levelJSON = data.levelJSON;
  }

  preload() {
    // Load images
    this.load.image("catchrHead", "/sprites/blob.png");
    this.load.image("catchrHand", "/sprites/hand.png");
    this.load.image("hitCircle", "/sprites/hitCircle.png");
    this.load.image("Slider", "/sprites/Slider.png");
    this.load.image("Dot", "/sprites/Slider-dot.png");
    this.load.image("Mine", "/sprites/Mine.png");
    this.load.image("Reverse", "/sprites/Reverse.png");
    this.load.image("Extra", "/sprites/Extra.png");
    this.load.image("Return", "/sprites/Return.png");

    // Load spritesheets
    this.load.spritesheet("hitCircleHit", "/sprites/HitCircle-Hit.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    // Define animations
    this.anims.create({
      key: "hitCircleEffect",
      frames: this.anims.generateFrameNumbers("hitCircleHit", { start: 0, end: 8 }),
      frameRate: 15,
      repeat: 0,
      hideOnComplete: true,
    });

    // Define head
    const { height, width } = this.sys.game.canvas;
    this.centerX = width / 2;
    this.centerY = height / 2;

    this.blob = this.add.image(this.centerX, this.centerY, "catchrHead");

    // Define hand
    this.hand = this.physics.add.image(this.blob.x + this.handDistance, this.blob.y, "catchrHand");
    this.hand.setCircle(20, 20, 20);
    this.hand.setCollideWorldBounds(true);
    this.hand.setImmovable(false);

    this.input.on("pointermove", this.handlerMouseMove, this);

    // Define hitCircles
    this.hitCircles = this.physics.add.group({
      classType: HitCircle,
      runChildUpdate: true,
    });

    // Define spawn event and collision event
    this.time.addEvent({
      delay: 100,
      callback: this.spawnHitCircle,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.overlap(this.hand, this.hitCircles, this.handleHit, undefined, this);
  }

  spawnHitCircle() {
    const newCircle = new HitCircle(this, 300, Phaser.Math.Between(0, 360));
    this.hitCircles.add(newCircle);
  }

  handleHit(hand: Phaser.GameObjects.GameObject, hitCircle: Phaser.GameObjects.GameObject) {
    if (hitCircle instanceof HitCircle) {
      hitCircle.handleHit(this);
    }
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

  update(time: number, delta: number): void {}
}
