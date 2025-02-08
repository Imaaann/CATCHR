export type levelData = {
  id: string;
  title: string;
  image_url: string;
  level_file_url: string;
  difficulty: string;
  audio_url: string;
};

export type HitCircle = {
  type:
    | "normal"
    | "slider-start"
    | "slider-pivot"
    | "slider-end"
    | "mine"
    | "reverse"
    | "extra-hand"
    | "remove-hand";
  radius: number;
  angle: number;
  speed?: number;
};

export type SliderPivot = HitCircle & {
  pivotData?: {
    pivotsLeft: number;
    nextPivot: { radius: number; angle: number };
  };
};

export type LevelJSON = HitCircle[][];
