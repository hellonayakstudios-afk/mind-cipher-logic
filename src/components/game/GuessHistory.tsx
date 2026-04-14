import { motion } from "framer-motion";
import type { GuessResult } from "@/lib/gameLogic";

interface GuessHistoryProps {
  guesses: GuessResult[];
  digitCount: number;
}

const GuessHistory = ({ guesses, digitCount }: GuessHistoryProps) => {
  return (
    <div className="flex flex-col-reverse gap-2 overflow-y-auto max-h-[40vh] px-2 scrollbar-thin">
      {guesses.map((g, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-between bg-game-surface rounded-lg px-4 py-3"
        >
          <div className="flex gap-1.5">
            {g.guess.split("").map((d, j) => (
              <span
                key={j}
                className="w-9 h-10 flex items-center justify-center rounded-md bg-muted font-lcd text-lg text-foreground"
              >
                {d}
              </span>
            ))}
          </div>
          <div className="flex gap-3 text-sm font-body">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-game-correct inline-block" />
              <span className="text-muted-foreground">{g.correctDigits}D</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-game-position inline-block" />
              <span className="text-muted-foreground">{g.correctPositions}P</span>
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default GuessHistory;
