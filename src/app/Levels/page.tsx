"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import DesktopLevelSelection from "../../components/DesktopComponents/DesktopLevelSelection";
import MobileLevelSelection from "../../components/MobileComponents/MobileLevelSelection";
import { supabaseClient } from "@/lib/supabaseClient";

function Home() {
  const [Levels, setLevels] = useState<any[]>([]);

  useEffect(() => {
    const fetchLevels = async () => {
      const { data, error } = await supabaseClient.from("levels").select("*");
      if (!error) setLevels(data);
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
