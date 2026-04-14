import { motion } from "framer-motion";
import { Brain, Timer, Hash } from "lucide-react";
import type { Difficulty, GameStats } from "@/lib/gameLogic";

interface HomeScreenProps {
  onStart: (d: Difficulty) => void;
  stats: GameStats;
}

function formatTime(seconds: number | null) {
  if (seconds === null) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const modes: { difficulty: Difficulty; label: string; sub: string }[] = [
  { difficulty: 3, label: "Novice", sub: "3 Digits" },
  { difficulty: 4, label: "Expert", sub: "4 Digits" },
  { difficulty: 5, label: "Master", sub: "5 Digits" },
];

const HomeScreen = ({ onStart, stats }: HomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <Brain className="mx-auto h-14 w-14 text-primary mb-4" />
        <h1 className="font-lcd text-4xl text-foreground glow-text tracking-wider">
          CIPHERMIND
        </h1>
        <p className="text-muted-foreground text-sm mt-2 font-body">
          Crack the code. Train your brain.
        </p>
      </motion.div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        {modes.map((mode, i) => (
          <motion.button
            key={mode.difficulty}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStart(mode.difficulty)}
            className="bg-card border border-border rounded-xl p-4 text-left transition-colors hover:border-primary/50 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-body font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                  {mode.label}
                </span>
                <span className="block text-muted-foreground text-sm">{mode.sub}</span>
              </div>
              <div className="text-right text-xs text-muted-foreground space-y-0.5">
                <div className="flex items-center gap-1 justify-end">
                  <Timer className="h-3 w-3" />
                  {formatTime(stats.bestTime[mode.difficulty])}
                </div>
                <div className="flex items-center gap-1 justify-end">
                  <Hash className="h-3 w-3" />
                  {stats.fewestGuesses[mode.difficulty] ?? "--"}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
