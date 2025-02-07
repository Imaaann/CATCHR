"use client";

import { useEffect, useRef, useState } from "react";
import PhaserLoading from "./PhaserLoading";

function Game() {
  const gameContainer = useRef<HTMLDivElement>(null);
  const [game, setGame] = useState<Phaser.Game>();

  useEffect(() => {
    async function initPhaser() {
      const Phaser = await import("phaser");
      const { default: catchrScene } = await import("../scenes/catchr");

      const phaserGame = new Phaser.Game({
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: gameContainer.current!,
        antialias: false,
        pixelArt: false,
        scene: [catchrScene],
        physics: {
          default: "arcade",
          arcade: {
            debug: true,
            gravity: { y: 0, x: 0 },
          },
        },
      });

      setGame(phaserGame);
    }
    if (!game) {
      initPhaser();
    }

    return () => {
      game?.destroy(true);
      setGame(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={gameContainer}
      className="w-screen h-screen flex flex-col items-center justify-center"
    >
      {!game && <PhaserLoading />}
    </div>
  );
}

export default Game;
