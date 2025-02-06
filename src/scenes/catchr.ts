/* eslint-disable @typescript-eslint/no-unused-vars */

export default class catchrScene extends Phaser.Scene {
  constructor() {
    super("catchrScene");
  }

  preload() {}

  create() {
    const { height, width } = this.sys.game.canvas;

    const graphic = this.add.graphics();

    graphic.lineStyle(1, 0xffffff, 1);

    const radius = 25;
    graphic.strokeCircle(width / 2, height / 2, 25);
  }

  update(time: number, delta: number): void {
    // Do shit at 60fps
  }
}
