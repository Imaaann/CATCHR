import HitCircle from "./HitCircle";

export default class Mine extends HitCircle {
  constructor(
    scene: Phaser.Scene,
    radius: number,
    angle: number,
    speed: number = 50,
    type: string = "Mine"
  ) {
    super(scene, radius, angle, speed, type);
  }

  handleHit(): void {}
}
