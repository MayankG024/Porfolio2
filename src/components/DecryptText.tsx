import { useEffect, useState, useRef } from "react";

interface DecryptTextProps {
  text: string;
  trigger?: boolean;
  duration?: number; // duration in ms
  delay?: number; // delay before starting the animation in ms
  className?: string;
  style?: React.CSSProperties;
}

const GLYPHS = "XX**++--//[]{}<>_#@$%&0123456789";

export default function DecryptText({
  text,
  trigger = false,
  duration = 40,
  delay = 0,
  className = "",
  style = {},
}: DecryptTextProps) {
  const [displayText, setDisplayText] = useState("");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!trigger) return;
    if (hasAnimated.current) {
      setDisplayText(text);
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

        // Left-to-right resolve
        const resolvedCount = Math.floor(progress * text.length);

        let currentText = "";
        for (let i = 0; i < text.length; i++) {
          if (i < resolvedCount) {
            currentText += text[i];
          } else if (progress < 1) {
            if (text[i] === " ") {
              currentText += " ";
            } else {
              const randomGlyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              currentText += randomGlyph;
            }
          } else {
            currentText += text[i];
          }
        }

        setDisplayText(currentText);

        if (progress < 1) {
          frameId = requestAnimationFrame(tick);
        }
      };

      frameId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
    };
  }, [text, trigger, delay]);

  // Initially render the correct text structure but hidden to prevent layout shift
  if (!displayText) {
    return (
      <span className={className} style={{ ...style, opacity: 0 }} aria-hidden="true">
        {text}
      </span>
    );
  }

  return (
    <span className={className} style={style}>
      {displayText}
    </span>
  );
}
