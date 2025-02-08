/* eslint-disable @typescript-eslint/no-explicit-any */
import { HitCircle, levelData, LevelJSON } from "@/types/levelData";

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

export function isValidLevelJSON(data: any): data is LevelJSON {
  if (!Array.isArray(data)) {
    console.error("JSON is not an array", data);
    return false;
  }

  for (const frame of data) {
    if (!Array.isArray(frame)) {
      console.error("Frame is not an array", frame);
      return false;
    }

    for (const obj of frame) {
      if (!isValidHitCircle(obj)) {
        console.error("Object isnt a valid hitCircle");
        return false;
      }
    }
  }

  return true;
}

export function isValidHitCircle(data: any): data is HitCircle {
  const validType = [
    "normal",
    "slider-start",
    "slider-pivot",
    "slider-end",
    "mine",
    "reverse",
    "extra-hand",
    "remove-hand",
  ];

  if (typeof data !== "object") {
    console.error("Hit circle isn't an object", data);
    return false;
  }
  if (!validType.includes(data.type)) {
    console.error("Hit circle isnt a valid type", data);
    return false;
  }
  if (typeof data.radius !== "number" || data.radius < 0) {
    console.error("Hit circle has invalid radius", data);
    return false;
  }
  if (typeof data.angle !== "number" || data.angle < 0 || data.angle > 360) {
    console.error("Hit circle has invalid angle", data);
    return false;
  }
  if (data.speed !== undefined && (typeof data.speed !== "number" || data.speed < 0)) {
    console.error("Hit circle has invalid speed", data);
    return false;
  }

  if (data.type.startsWith("slider") && data.type !== "slider-end" && !isValidPivot(data)) {
    console.error("Hit circle has invalid pivots", data);
    return false;
  }

  return true;
}

export function isValidPivot(data: any): boolean {
  if (!data.pivotData) return false;
  const { pivotsLeft, nextPivot } = data.pivotData;
  if (typeof pivotsLeft !== "number" || pivotsLeft < 0) return false;
  if (!nextPivot || typeof nextPivot.radius !== "number" || typeof nextPivot.angle !== "number")
    return false;

  return true;
}
