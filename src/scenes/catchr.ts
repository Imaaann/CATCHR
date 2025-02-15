/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { levelData, LevelJSON, PivotData, SliderLine } from "@/types/levelData";
import HitCircle from "./HitCircle";
import type { HitCircleData, SliderPivot } from "@/types/levelData";
import Mine from "./Mine";
import Reverse from "./Reverse";
import Return from "./Return";
import Extra from "./Extra";
import Hand from "./Hand";
import Dot from "./Dot";
import Slider from "./Slider";

export default class catchrScene extends Phaser.Scene {
  private blob!: Phaser.GameObjects.Image;
  private hands!: Phaser.Physics.Arcade.Group;

  private levelData!: levelData;
  private levelJSON!: LevelJSON;

  private hitCircles!: Phaser.Physics.Arcade.Group;

  private scoreText: Phaser.GameObjects.Text;
  private comboText: Phaser.GameObjects.Text;
  private healthBar: Phaser.GameObjects.Graphics;

  centerX!: number;
  centerY!: number;

  currentFrame: number = 0;
  gameRunning: boolean = false;
  isWinner: boolean = false;
  isHighScore: boolean = false;
  score: number = 0;
  combo: number = 1;
  maxCombo: number = 1;
  health: number = 100;
  isReversed: boolean = false;
  handCount: number = 1;
  pendingSliders!: { line: SliderLine; current: number }[] = [];

  // constants
  handDistance: number = 120;
  maxHpLength: number = 250;
  regen: number = 50;

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
    this.load.image("catchrPause", "/sprites/paused.png");
    this.load.image("catchrHand", "/sprites/hand.png");
    this.load.image("hitCircle", "/sprites/HitCircle.png");
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

    this.load.spritesheet("sliderHit", "/sprites/Slider-hit.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("dotHit", "/sprites/Slider-dot-hit.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.audio("Hit", "/sfx/hit.wav");
    this.load.audio("Explode", "/sfx/explosion.wav");
    this.load.audio("Reverse", "/sfx/reverse.wav");
    this.load.audio("Extra", "/sfx/extra.wav");
    this.load.audio("Return", "/sfx/return.wav");

    if (this.levelData && this.levelData.audio_url) {
      this.load.audio("levelMusic", {
        key: "levelMusic",
        url: this.levelData.audio_url,
        type: "audio/mpeg",
      });
    }
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

    this.anims.create({
      key: "sliderEffect",
      frames: this.anims.generateFrameNumbers("sliderHit", { start: 0, end: 4 }),
      frameRate: 15,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: "dotEffect",
      frames: this.anims.generateFrameNumbers("dotHit", { start: 0, end: 4 }),
      frameRate: 15,
      repeat: 0,
      hideOnComplete: true,
    });

    //#endregion

    //#region Music
    if (this.sound.locked) {
      this.sound.once(Phaser.Sound.Events.UNLOCKED, () => this.startMusic());
    } else {
      this.startMusic();
    }

    //#endregion

    //#region Player

    // Define head
    const { height, width } = this.sys.game.canvas;
    this.centerX = width / 2;
    this.centerY = height / 2;

    this.blob = this.add.image(this.centerX, this.centerY, "catchrPause");
    this.blob.setInteractive();

    this.blob.on("pointerdown", () => {
      this.blob.setTexture("catchrHead");
      this.startGame();
    });

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

    // Display Health
    this.healthBar = this.add.graphics();
    this.updateHealthBar(0);

    // Define regen event
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.health <= 100 - this.regen) this.updateHealthBar(this.regen);
      },
      callbackScope: this,
      loop: true,
    });

    //#endregion

    //#region hitCircles

    // Define hitCircles
    this.hitCircles = this.physics.add.group({
      classType: HitCircle,
      runChildUpdate: true,
    });

    // Define spawn event and collision event
    this.time.addEvent({
      delay: this.levelData.frame_diffrence || 500,
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

  updateLocalScore() {
    if (this.score > parseInt(localStorage.getItem(this.levelData.id) || "0")) {
      localStorage.setItem(this.levelData.id, this.score);
      this.isHighScore = true;
    }
  }

  updateCombo(combo) {
    this.combo = combo;
    this.maxCombo = this.maxCombo <= this.combo ? this.combo : this.maxCombo;
    this.comboText.setText(`x${this.combo}`);
  }

  updateHealthBar(val: number) {
    if (!this.healthBar) return;

    this.health = this.health > 0 ? this.health + val : 0;
    this.healthBar.clear();

    const healthLength = (this.health / 100) * this.maxHpLength;

    this.healthBar.fillStyle(0xffffff, 1);
    this.healthBar.fillRect(10, 50 + (this.maxHpLength - healthLength), 5, healthLength);
  }

  startMusic() {
    const music = this.sound.add("levelMusic");
    music.play({ loop: false });
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

  startGame() {
    this.gameRunning = true;
  }

  spawnHitCircle() {
    if (!this.gameRunning) return;

    if (this.currentFrame >= this.levelJSON.length) {
      if (this.currentFrame == this.levelJSON.length + 10) this.isWinner = true;
      else this.currentFrame++;
      return;
    }

    const newCircles = this.levelJSON[this.currentFrame].map(
      (circle: HitCircleData | SliderPivot) => {
        switch (circle.type) {
          case "normal":
            return new HitCircle(this, circle.radius, circle.angle, circle.speed);
          case "mine":
            return new Mine(this, circle.radius, circle.angle, circle.speed);
          case "extra-hand":
            return new Extra(this, circle.radius, circle.angle, circle.speed);
          case "remove-hand":
            return new Return(this, circle.radius, circle.angle, circle.speed);
          case "reverse":
            return new Reverse(this, circle.radius, circle.angle, circle.speed);
          case "slider":
            return new Slider(this, circle.radius, circle.angle, circle.pivotData, circle.speed);
        }
      }
    );
    this.currentFrame++;

    const SliderDots = this.pendingSliders
      .map((slider) => {
        slider.current++;
        if (slider.line.time > slider.current) {
          return Slider.spawnDot(this, slider.line, slider.current);
        }
      })
      .filter((dot) => dot !== undefined);
    this.pendingSliders = this.pendingSliders.filter((slider) => slider.line.time > slider.current);

    this.hitCircles.addMultiple(newCircles);
    this.hitCircles.addMultiple(SliderDots);
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

  update(time: number, delta: number): void {
    if (this.health == 0 || this.isWinner) {
      this.time.removeAllEvents();
      this.input.removeAllListeners();
      this.tweens.killAll();
      this.children.removeAll(true);
      this.physics.world.removeAllListeners();
      this.sound.stopAll();

      if (this.isWinner) {
        this.updateLocalScore();
      }

      this.add
        .text(this.centerX, this.centerY - 50, `You ${this.isWinner ? "Win" : "Lose"}`, {
          fontSize: "48px",
          color: "#ffffff",
          fontFamily: "Arial",
        })
        .setOrigin(0.5, 0.5);

      this.add
        .text(this.centerX, this.centerY + 10, `Score: ${this.score}`, {
          fontSize: "32px",
          color: "#fffff0",
          fontFamily: "Arial",
        })
        .setOrigin(0.5, 0.5);

      if (this.isHighScore) {
        this.add
          .text(this.centerX, this.centerY + 20, "High Score!", {
            fontSize: "28px",
            color: "#adebb3",
            fontFamily: "Arial",
          })
          .setOrigin(0.5, 0.5);
      }
    }
  }
}
