import { useState } from "react";
import HomeScreen from "@/components/game/HomeScreen";
import GameScreen from "@/components/game/GameScreen";
import { loadStats } from "@/lib/gameLogic";
import type { Difficulty } from "@/lib/gameLogic";

const Index = () => {
  const [screen, setScreen] = useState<"home" | "game">("home");
  const [difficulty, setDifficulty] = useState<Difficulty>(4);

  const handleStart = (d: Difficulty) => {
    setDifficulty(d);
    setScreen("game");
  };

  if (screen === "game") {
    return (
      <GameScreen
        key={`${difficulty}-${Date.now()}`}
        difficulty={difficulty}
        onBack={() => setScreen("home")}
      />
    );
  }

  return <HomeScreen onStart={handleStart} stats={loadStats()} />;
};

export default Index;
