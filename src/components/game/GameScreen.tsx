import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowLeft, Timer, Hash } from "lucide-react";
import Numpad from "./Numpad";
import GuessHistory from "./GuessHistory";
import DigitDisplay from "./DigitDisplay";
import WinOverlay from "./WinOverlay";
import { evaluateGuess, generateTarget, loadStats, saveStats } from "@/lib/gameLogic";
import type { Difficulty, GuessResult } from "@/lib/gameLogic";

interface GameScreenProps {
  difficulty: Difficulty;
  onBack: () => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const GameScreen = ({ difficulty, onBack }: GameScreenProps) => {
  const [target] = useState(() => generateTarget(difficulty));
  const [currentInput, setCurrentInput] = useState("");
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [time, setTime] = useState(0);
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState(false);
  const [isNewBestTime, setIsNewBestTime] = useState(false);
  const [isFewestGuesses, setIsFewestGuesses] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleDigit = useCallback((d: string) => {
    if (won) return;
    setCurrentInput((prev) => (prev.length < difficulty ? prev + d : prev));
  }, [difficulty, won]);

  const handleDelete = useCallback(() => {
    setCurrentInput((prev) => prev.slice(0, -1));
  }, []);

  const handleSubmit = useCallback(() => {
    if (won) return;
    if (currentInput.length !== difficulty) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const result = evaluateGuess(currentInput, target);
    const entry: GuessResult = { guess: currentInput, ...result };
    const newGuesses = [...guesses, entry];
    setGuesses(newGuesses);
    setCurrentInput("");

    if (result.correctPositions === difficulty) {
      clearInterval(timerRef.current);
      setWon(true);

      // Save stats
      const stats = loadStats();
      let newBest = false;
      let fewest = false;
      if (stats.bestTime[difficulty] === null || time < stats.bestTime[difficulty]!) {
        stats.bestTime[difficulty] = time;
        newBest = true;
      }
      if (stats.fewestGuesses[difficulty] === null || newGuesses.length < stats.fewestGuesses[difficulty]!) {
        stats.fewestGuesses[difficulty] = newGuesses.length;
        fewest = true;
      }
      saveStats(stats);
      setIsNewBestTime(newBest);
      setIsFewestGuesses(fewest);
    }
  }, [currentInput, difficulty, guesses, target, time, won]);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") handleDigit(e.key);
      else if (e.key === "Backspace") handleDelete();
      else if (e.key === "Enter") handleSubmit();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleDigit, handleDelete, handleSubmit]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-4 font-lcd text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Timer className="h-4 w-4" />
            {formatTime(time)}
          </span>
          <span className="flex items-center gap-1">
            <Hash className="h-4 w-4" />
            {guesses.length}
          </span>
        </div>
      </div>

      {/* History */}
      <div className="flex-1 overflow-hidden py-3">
        <GuessHistory guesses={guesses} digitCount={difficulty} />
      </div>

      {/* Input area */}
      <div className="border-t border-border bg-card px-4 pt-4 pb-6 space-y-4">
        <DigitDisplay digits={currentInput} maxDigits={difficulty} shake={shake} />
        <Numpad
          onDigit={handleDigit}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
          disabled={won}
        />
      </div>

      <WinOverlay
        show={won}
        time={time}
        guessCount={guesses.length}
        isNewBestTime={isNewBestTime}
        isFewestGuesses={isFewestGuesses}
        onPlayAgain={() => window.location.reload()}
        onMenu={onBack}
      />
    </div>
  );
};

export default GameScreen;
