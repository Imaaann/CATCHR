/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { levelData, LevelJSON } from "@/types/levelData";
import HitCircle from "./HitCircle";
import { createLocalRequestContext } from "next/dist/server/after/builtin-request-context";
import Mine from "./Mine";
import Reverse from "./Reverse";
import Return from "./Return";
import Extra from "./Extra";
import Hand from "./Hand";

export default class catchrScene extends Phaser.Scene {
  private blob!: Phaser.GameObjects.Image;
  private hand!: Phaser.Physics.Arcade.Image;

  private hands!: Phaser.Physics.Arcade.Group;

  private levelData!: levelData;
  private levelJSON!: LevelJSON;

  private centerX!: number;
  private centerY!: number;

  private hitCircles!: Phaser.Physics.Arcade.Group;

  private scoreText: Phaser.GameObjects.Text;
  private comboText: Phaser.GameObjects.Text;

  score: number = 0;
  combo: number = 1;
  isReversed: boolean = false;
  handCount: number = 1;
  handDistance: number = 120;

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

    this.load.spritesheet("mineHit", "/sprites/Mine-Hit.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("reverseHit", "/sprites/Reverse-Hit.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("returnHit", "/sprites/Return-Hit.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("extraHit", "/sprites/Extra-Hit.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    //#region Animations
    // Define animations
    this.anims.create({
      key: "hitCircleEffect",
      frames: this.anims.generateFrameNumbers("hitCircleHit", { start: 0, end: 8 }),
      frameRate: 15,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: "mineEffect",
      frames: this.anims.generateFrameNumbers("mineHit", { start: 0, end: 8 }),
      frameRate: 15,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: "reverseEffect",
      frames: this.anims.generateFrameNumbers("reverseHit", { start: 0, end: 20 }),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: "returnEffect",
      frames: this.anims.generateFrameNumbers("returnHit", { start: 0, end: 20 }),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: "extraEffect",
      frames: this.anims.generateFrameNumbers("extraHit", { start: 0, end: 20 }),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });
    //#endregion

    //#region Player

    // Define head
    const { height, width } = this.sys.game.canvas;
    this.centerX = width / 2;
    this.centerY = height / 2;

    this.blob = this.add.image(this.centerX, this.centerY, "catchrHead");

    // Define hand
    this.hands = this.physics.add.group({
      classType: Hand,
    });
    this.hands.add(new Hand(this, 0));

    this.input.on("pointermove", this.handleMouseMove, this);

    //#endregion

    //#region score/combo/health
    // Display Score
    const marginTop = 20;

    this.scoreText = this.add
      .text(this.centerX, marginTop, `${this.score}`, {
        fontSize: "28px",
        color: "#ffffff",
        fontFamily: "Arial",
      })
      .setOrigin(0.5, 0);

    // Display Combo
    this.comboText = this.add
      .text(this.centerX, marginTop + 40, `x${this.combo}`, {
        fontSize: "24px",
        color: "#ffff99",
        fontFamily: "Arial",
      })
      .setOrigin(0.5, 0);
    //#endregion

    //#region hitCircles
    // Define hitCircles
    this.hitCircles = this.physics.add.group({
      classType: HitCircle,
      runChildUpdate: true,
    });

    // Define spawn event and collision event
    this.time.addEvent({
      delay: 500,
      callback: this.spawnHitCircle,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.overlap(this.hands, this.hitCircles, this.handleHit, undefined, this);
    //#endregion
  }

  updateScore(score) {
    this.score = score;
    this.scoreText.setText(`${this.score}`);
  }

  updateCombo(combo) {
    this.combo = combo;
    this.comboText.setText(`x${this.combo}`);
  }

  spawnHand() {
    const newHand = new Hand(this, ++this.handCount);
    this.hands.add(newHand);

    this.hands
      .getChildren()
      .forEach((hand: Hand, index: number) => hand.updateAngle(index, this.handCount));

    this.simulateMove();
  }

  clearHands() {
    this.hands.clear(true, true);

    const newHand = new Hand(this, 0);
    this.hands.add(newHand);

    this.handCount = 1;

    this.simulateMove();
  }

  spawnHitCircle() {
    const dice = Phaser.Math.Between(0, 15);
    const angle = Phaser.Math.Between(0, 360);
    const radius = Phaser.Math.Between(200, 400);
    let newCircle: HitCircle;
    switch (dice) {
      // case 0:
      //   newCircle = new Mine(this, radius, angle);
      //   break;
      // case 1:
      //   newCircle = new Reverse(this, radius, angle);
      //   break;
      // case 2:
      //   newCircle = new Return(this, radius, angle);
      //   break;
      // case 3:
      //   newCircle = new Extra(this, radius, angle);
      //   break;
      default:
        newCircle = new HitCircle(this, radius, angle);
        break;
    }

    this.hitCircles.add(newCircle);
  }

  simulateMove() {
    const pointer = this.input.activePointer;

    this.input.emit("pointermove", {
      x: pointer.x,
      y: pointer.y,
      worldX: pointer.worldX,
      worldY: pointer.worldY,
    });
  }

  handleHit(hand: Phaser.GameObjects.GameObject, hitCircle: Phaser.GameObjects.GameObject) {
    if (hitCircle instanceof HitCircle) {
      hitCircle.handleHit(this);
    }
  }

  handleMouseMove(pointer: Phaser.Input.Pointer) {
    this.hands.getChildren().forEach((hand: Hand) => {
      hand.move(pointer, this);
    });
  }
}
