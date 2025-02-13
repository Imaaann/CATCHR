/* eslint-disable @typescript-eslint/no-explicit-any */
import { HitCircleData, levelData, LevelJSON, PivotData } from "@/types/levelData";

export const fetchJSON = async (levelData: levelData) => {
  try {
    if (levelData == undefined) return;

    const response = await fetch(
      `/api/proxy?level=${encodeURIComponent(levelData.level_file_url)}`
    );

    const json = await response.json();
    console.log("levelJSON before validation: ", json);
    const validJSON: LevelJSON = isValidLevelJSON(json) ? json : [[], []];
    return validJSON;
  } catch (error) {
    console.error("error fetching level.json: ", error);
  }
};

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
        console.error("Object isn't a valid HitCircle", obj);
        return false;
      }
    }
  }

  return true;
}

export function isValidHitCircle(data: any): data is HitCircleData {
  const validTypes = ["normal", "slider", "mine", "reverse", "extra-hand", "remove-hand"];

  if (typeof data !== "object") {
    console.error("HitCircle isn't an object", data);
    return false;
  }
  if (!validTypes.includes(data.type)) {
    console.error("HitCircle isn't a valid type", data);
    return false;
  }
  if (typeof data.radius !== "number" || data.radius < 0) {
    console.error("HitCircle has an invalid radius", data);
    return false;
  }
  if (typeof data.angle !== "number" || data.angle < 0 || data.angle > 360) {
    console.error("HitCircle has an invalid angle", data);
    return false;
  }
  if (data.speed !== undefined && (typeof data.speed !== "number" || data.speed < 0)) {
    console.error("HitCircle has an invalid speed", data);
    return false;
  }

  // Validate sliders that require pivot data
  if (data.type === "slider" && !isValidPivotData(data.pivotData)) {
    console.error("Slider has invalid pivot data", data);
    return false;
  }

  return true;
}

export function isValidPivotData(pivotData: any): pivotData is PivotData {
  if (!pivotData || typeof pivotData !== "object") return false;
  if (
    typeof pivotData.radius !== "number" ||
    pivotData.radius < 0 ||
    typeof pivotData.angle !== "number" ||
    pivotData.angle < 0 ||
    pivotData.angle > 360 ||
    typeof pivotData.frames !== "number" ||
    pivotData.frames < 1
  ) {
    return false;
  }
  return true;
}
