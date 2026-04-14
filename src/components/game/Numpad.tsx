import { motion } from "framer-motion";
import { Delete, CornerDownLeft } from "lucide-react";

interface NumpadProps {
  onDigit: (d: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const Numpad = ({ onDigit, onDelete, onSubmit, disabled }: NumpadProps) => {
  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["del", "0", "enter"],
  ];

  return (
    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
      {keys.flat().map((key) => {
        const isAction = key === "del" || key === "enter";
        return (
          <motion.button
            key={key}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            disabled={disabled}
            onClick={() => {
              if (key === "del") onDelete();
              else if (key === "enter") onSubmit();
              else onDigit(key);
            }}
            className={`
              h-14 rounded-lg font-lcd text-lg font-semibold transition-colors
              disabled:opacity-40 select-none
              ${key === "enter"
                ? "bg-primary text-primary-foreground"
                : key === "del"
                ? "bg-destructive/20 text-destructive"
                : "bg-game-numpad text-foreground hover:bg-game-numpad-hover"
              }
            `}
          >
            {key === "del" ? <Delete className="mx-auto h-5 w-5" /> :
             key === "enter" ? <CornerDownLeft className="mx-auto h-5 w-5" /> :
             key}
          </motion.button>
        );
      })}
    </div>
  );
};

export default Numpad;
