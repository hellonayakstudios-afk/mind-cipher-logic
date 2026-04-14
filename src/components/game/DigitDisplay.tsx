import { motion } from "framer-motion";

interface DigitDisplayProps {
  digits: string;
  maxDigits: number;
  shake?: boolean;
}

const DigitDisplay = ({ digits, maxDigits, shake }: DigitDisplayProps) => {
  return (
    <motion.div
      animate={shake ? { x: [0, -6, 6, -6, 6, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="flex gap-2 justify-center"
    >
      {Array.from({ length: maxDigits }).map((_, i) => {
        const filled = i < digits.length;
        return (
          <motion.div
            key={i}
            animate={filled ? { scale: [1.15, 1] } : {}}
            transition={{ duration: 0.1 }}
            className={`
              w-12 h-14 rounded-lg flex items-center justify-center font-lcd text-2xl
              border-2 transition-colors
              ${filled
                ? "border-primary bg-primary/10 text-foreground glow-text"
                : "border-border bg-muted/30 text-muted-foreground"
              }
            `}
          >
            {filled ? digits[i] : "·"}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default DigitDisplay;
