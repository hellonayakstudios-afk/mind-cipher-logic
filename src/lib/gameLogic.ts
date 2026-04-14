export type Difficulty = 3 | 4 | 5;

export interface GuessResult {
  guess: string;
  correctDigits: number;
  correctPositions: number;
}

export interface GameStats {
  bestTime: Record<Difficulty, number | null>;
  fewestGuesses: Record<Difficulty, number | null>;
}

export function generateTarget(digits: Difficulty): string {
  let result = '';
  for (let i = 0; i < digits; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

export function evaluateGuess(guess: string, target: string): { correctDigits: number; correctPositions: number } {
  let correctPositions = 0;
  let correctDigits = 0;
  const targetArr = target.split('');
  const guessArr = guess.split('');

  // Count correct positions first
  const targetRemaining: string[] = [];
  const guessRemaining: string[] = [];

  for (let i = 0; i < guessArr.length; i++) {
    if (guessArr[i] === targetArr[i]) {
      correctPositions++;
    } else {
      targetRemaining.push(targetArr[i]);
      guessRemaining.push(guessArr[i]);
    }
  }

  // Count correct digits (not in position) from remaining
  const targetCount: Record<string, number> = {};
  for (const d of targetRemaining) {
    targetCount[d] = (targetCount[d] || 0) + 1;
  }
  for (const d of guessRemaining) {
    if (targetCount[d] && targetCount[d] > 0) {
      correctDigits++;
      targetCount[d]--;
    }
  }

  return { correctDigits: correctDigits + correctPositions, correctPositions };
}

const STORAGE_KEY = 'ciphermind_stats';

export function loadStats(): GameStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { bestTime: { 3: null, 4: null, 5: null }, fewestGuesses: { 3: null, 4: null, 5: null } };
}

export function saveStats(stats: GameStats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}
