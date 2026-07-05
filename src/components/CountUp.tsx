import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number; // duration in ms
  delay?: number; // delay before starting in ms
  decimals?: number;
  suffix?: string;
  trigger?: boolean;
}

export default function CountUp({
  end,
  start = 0,
  duration = 40,
  delay = 0,
  decimals = 1,
  suffix = "",
  trigger = false,
}: CountUpProps) {
  const [value, setValue] = useState(start);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!trigger) return;
    if (hasAnimated.current) {
      setValue(end);
      return;
    }

    const startTimeout = setTimeout(() => {
      hasAnimated.current = true;
      let frame = 0;
      const totalFrames = 80;
      let frameId: number;

      const tick = () => {
        frame++;
        const progress = Math.min(1, frame / totalFrames);

        const currentVal = start + (end - start) * progress;
        setValue(currentVal);

        if (progress < 1) {
          frameId = requestAnimationFrame(tick);
        }
      };

      frameId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
    };
  }, [start, end, trigger, delay]);

  return (
    <span>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
