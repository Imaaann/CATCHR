/* eslint-disable @typescript-eslint/no-explicit-any */
import { levelData } from "@/types/levelData";

export function isValidLevelData(data: any): data is levelData {
  return (
    typeof data.id === "string" &&
    typeof data.title === "string" &&
    typeof data.image_url === "string" &&
    typeof data.level_file_url === "string" &&
    typeof data.difficulty === "string" &&
    typeof data.audio_url === "string"
  );
}
