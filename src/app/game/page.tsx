"use client";
import type { levelData } from "@/types/levelData";
import { supabaseClient } from "@/lib/supabaseClient";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import LevelLoading from "@/components/LevelLoading";
import NoLevel from "@/components/NoLevel";
import NowPlaying from "@/components/NowPlaying";
import dynamic from "next/dynamic";
import { isValidLevelData } from "@/helpers/common";

const Game = dynamic(() => import("@/components/Game"), { ssr: false });

function SuspenseHome() {
  const searchParams = useSearchParams();
  const levelUuid = searchParams.get("uuid");
  const [levelData, setLevelData] = useState<levelData>();

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
              audio_url: "NONE",
              frame_diffrence: 500,
            };
        setLevelData(validLevel);
      }
    };

    fetchLevel();
  }, [levelUuid]);

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
      <Game levelData={levelData} />
    </div>
  );
}

function Home() {
  return (
    <Suspense>
      <SuspenseHome />
    </Suspense>
  );
}

export default Home;
