import { PivotData, SliderLine } from "@/types/levelData";
import catchrScene from "./catchr";
import HitCircle from "./HitCircle";
import Dot from "./Dot";

export default class Slider extends HitCircle {
  constructor(
    scene: catchrScene,
    radius: number,
    angle: number,
    pivot: PivotData,
    speed: number = 50,
    type: string = "Slider"
  ) {
    super(scene, radius, angle, speed, type);
    scene.pendingSliders.push({
      line: {
        time: pivot.frames,
        speed: speed,

        start: {
          radius: radius,
          angle: angle,
        },

        end: {
          radius: pivot.radius,
          angle: pivot.angle,
        },
      },
      current: 0,
    });
  }

  handleHit(scene: catchrScene): void {
    const effect = scene.add.sprite(this.x, this.y, "sliderHit");
    effect.play("sliderEffect");
    scene.sound.play("Hit", { volume: 0.2 });
    super.setHit(true);
    this.destroy();
  }

  static spawnDot(scene: catchrScene, line: SliderLine, time: number) {
    const t = time / line.time;

    const spawnRadius = line.start.radius + t * (line.end.radius - line.start.radius);
    const spawnAngle = line.start.angle + t * (line.end.angle - line.start.angle);

    return new Dot(scene, spawnRadius, spawnAngle, line.speed);
  }
}
