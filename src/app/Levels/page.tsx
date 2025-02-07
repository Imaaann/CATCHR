"use client";
import { useEffect, useState } from "react";
import DesktopLevelSelection from "../../components/DesktopComponents/DesktopLevelSelection";
import MobileLevelSelection from "../../components/MobileComponents/MobileLevelSelection";
import { supabaseClient } from "@/lib/supabaseClient";
import type { levelData } from "@/types/levelData";
import { isValidLevelData } from "@/helpers/common";

function Home() {
  const [Levels, setLevels] = useState<levelData[]>([]);

  useEffect(() => {
    const fetchLevels = async () => {
      const { data, error } = await supabaseClient.from("levels").select("*");
      if (error) {
        console.error("Error loading levels: " + error.message);
        return;
      }

      if (Array.isArray(data)) {
        const validLevels: levelData[] = data.filter((level): level is levelData =>
          isValidLevelData(level)
        );
        setLevels(validLevels);
      }
    };

    fetchLevels();
  }, []);

  return (
    <div className="overflow-auto scrollbar-none">
      <MobileLevelSelection levels={Levels} />
      <DesktopLevelSelection levels={Levels} />
    </div>
  );
}

export default Home;
