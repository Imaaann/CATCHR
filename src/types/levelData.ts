export type levelData = {
  id: string;
  title: string;
  image_url: string;
  level_file_url: string;
  difficulty: string;
  audio_url: string;
  frame_diffrence: number;
};

export type HitCircleData = {
  type: "normal" | "slider" | "mine" | "reverse" | "extra-hand" | "remove-hand";
  radius: number;
  angle: number;
  speed?: number;
};

export type PivotData = { radius: number; angle: number; frames: number };

export type SliderLine = {
  start: { radius: number; angle: number };
  end: { radius: number; angle: number };
  time: number;
  speed: number;
};

export type SliderPivot = HitCircleData & {
  pivotData?: PivotData;
};

export type LevelJSON = HitCircleData[][];
