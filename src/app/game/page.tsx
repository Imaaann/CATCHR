"use client";
import { levelData } from "@/components/LevelCard";
import { supabaseClient } from "@/lib/supabaseClient";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isValidLevelData } from "../levels/page";
import LevelLoading from "@/components/LevelLoading";
import NoLevel from "@/components/NoLevel";
import NowPlaying from "@/components/NowPlaying";
import dynamic from "next/dynamic";

const Game = dynamic(() => import("@/components/Game"), { ssr: false });

function Home() {
  const searchParams = useSearchParams();
  const levelUuid = searchParams.get("uuid");
  const [levelData, setLevelData] = useState<levelData>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [levelJSON, setLevelJSON] = useState(null);

  const fetchedLevel = useRef(false);

  useEffect(() => {
    if (!levelUuid || fetchedLevel.current) return;

    fetchedLevel.current = true;

    const fetchLevel = async () => {
      const { data, error } = await supabaseClient.from("levels").select("*").eq("id", levelUuid);
      if (error) {
        console.error("error fetching level data: ", error.message);
        return;
      }

      if (Array.isArray(data)) {
        const validLevel: levelData = isValidLevelData(data[0])
          ? data[0]
          : {
              id: "NONE",
              title: "NONE",
              image_url: "NONE",
              level_file_url: "NONE",
              difficulty: "NONE",
            };
        setLevelData(validLevel);
      }
    };

    fetchLevel();
  }, [levelUuid]);

  useEffect(() => {
    if (!levelData?.level_file_url) return;

    const fetchJSON = async () => {
      try {
        if (levelData == undefined) return;

        const response = await fetch(
          `/api/proxy?level=${encodeURIComponent(levelData.level_file_url)}`
        );

        const json = await response.json();
        console.log(json);
        setLevelJSON(json);
      } catch (error) {
        console.error("error fetching level.json: ", error);
      }
    };

    fetchJSON();
  }, [levelData]);

  if (!levelUuid)
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <NoLevel />
      </div>
    );
  if (!levelData)
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <LevelLoading />
      </div>
    );

  return (
    <div className="font-hoover text-3xl text-white relative">
      <NowPlaying
        imageSrc={levelData.image_url}
        title={levelData.title}
        difficulty={levelData.difficulty}
      />
      <Game />
    </div>
  );
}

export default Home;
