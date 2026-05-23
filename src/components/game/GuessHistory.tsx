import { motion } from "framer-motion";
import type { GuessResult } from "@/lib/gameLogic";

interface GuessHistoryProps {
  guesses: GuessResult[];
  digitCount: number;
}

const GuessRow = ({ g, highlight }: { g: GuessResult; highlight?: boolean }) => (
  <div
    className={`flex items-center justify-between rounded-lg px-4 py-3 ${
      highlight
        ? "bg-primary/10 border border-primary/40 glow-primary"
        : "bg-game-surface"
    }`}
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
    <div className="flex gap-2 text-xs font-body">
      <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/40">
        <span className="w-2 h-2 rounded-full bg-game-position inline-block" />
        <span className="font-lcd text-base text-foreground leading-none">{g.correctPositions}</span>
        <span className="text-muted-foreground uppercase tracking-wide">Place</span>
      </span>
      <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/40">
        <span className="w-2 h-2 rounded-full bg-game-correct inline-block" />
        <span className="font-lcd text-base text-foreground leading-none">{g.correctDigits}</span>
        <span className="text-muted-foreground uppercase tracking-wide">Digit</span>
      </span>
    </div>
  </div>
);

const GuessHistory = ({ guesses }: GuessHistoryProps) => {
  const latest = guesses[guesses.length - 1];
  const rest = guesses.slice(0, -1);

  return (
    <div className="flex flex-col gap-2 px-2 max-h-[40vh]">
      {latest && (
        <div className="sticky top-0 z-10 pb-1 bg-background/95 backdrop-blur-sm">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 px-1">
            Latest guess
          </div>
          <motion.div
            key={guesses.length}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <GuessRow g={latest} highlight />
          </motion.div>
        </div>
      )}
      <div className="flex flex-col-reverse gap-2 overflow-y-auto scrollbar-thin">
        {rest.map((g, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <GuessRow g={g} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GuessHistory;
