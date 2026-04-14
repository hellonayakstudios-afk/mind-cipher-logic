import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Timer, Hash } from "lucide-react";

interface WinOverlayProps {
  show: boolean;
  time: number;
  guessCount: number;
  isNewBestTime: boolean;
  isFewestGuesses: boolean;
  onPlayAgain: () => void;
  onMenu: () => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const WinOverlay = ({ show, time, guessCount, isNewBestTime, isFewestGuesses, onPlayAgain, onMenu }: WinOverlayProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-card rounded-2xl p-8 max-w-sm w-full mx-4 text-center border border-border"
          >
            <motion.div
              initial={{ rotate: -20 }}
              animate={{ rotate: 0 }}
              transition={{ type: "spring", damping: 10 }}
            >
              <Trophy className="mx-auto h-12 w-12 text-primary mb-4" />
            </motion.div>
            <h2 className="font-lcd text-2xl text-foreground glow-text mb-2">CODE CRACKED</h2>
            <p className="text-muted-foreground text-sm mb-6">You solved it!</p>

            <div className="flex justify-center gap-6 mb-6">
              <div className="text-center">
                <Timer className="mx-auto h-5 w-5 text-muted-foreground mb-1" />
                <span className="font-lcd text-xl text-foreground">{formatTime(time)}</span>
                {isNewBestTime && (
                  <span className="block text-xs text-primary font-semibold mt-1">NEW BEST!</span>
                )}
              </div>
              <div className="text-center">
                <Hash className="mx-auto h-5 w-5 text-muted-foreground mb-1" />
                <span className="font-lcd text-xl text-foreground">{guessCount}</span>
                {isFewestGuesses && (
                  <span className="block text-xs text-primary font-semibold mt-1">NEW BEST!</span>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onMenu}
                className="flex-1 py-3 rounded-lg bg-secondary text-secondary-foreground font-body font-medium transition-colors hover:bg-secondary/80"
              >
                Menu
              </button>
              <button
                onClick={onPlayAgain}
                className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-body font-medium glow-primary transition-colors hover:bg-primary/90"
              >
                Play Again
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WinOverlay;
