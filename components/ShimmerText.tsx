"use client";

import { useEffect, useRef } from "react";

interface ShimmerTextProps {
  text: string;
  fontSize: number;
  color: string;
}

export const ShimmerText = ({ text, fontSize, color }: ShimmerTextProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const fontString = `300 italic ${fontSize * 0.85}px 'Cormorant', serif`

    const setup = () => {
      ctx.font = fontString;
      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;
      const textHeight = fontSize * 1.25;

      canvas.width = (textWidth + 20) * dpr;
      canvas.height = textHeight * dpr;
      canvas.style.width = `${textWidth + 20}px`;
      canvas.style.height = `${textHeight}px`;

      let progress = -0.3;
      let waiting = false;
      let waitStart = 0;

      const draw = (timestamp: number) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(dpr, dpr);

        const w = textWidth + 20;
        const h = textHeight;

        ctx.font = fontString;
        ctx.fillStyle = color;
        ctx.fillText(text, 10, fontSize * 0.95);

        if (!waiting) {
          const x = progress * (w + 200) - 60;
          ctx.globalCompositeOperation = "source-atop";
          const grad = ctx.createLinearGradient(x - 80, 0, x + 80, h);
          grad.addColorStop(0, "rgba(255,248,200,0)");
          grad.addColorStop(0.35, "rgba(255,248,200,0)");
          grad.addColorStop(0.47, "rgba(255,255,230,0.6)");
          grad.addColorStop(0.5, "rgba(255,255,255,0.92)");
          grad.addColorStop(0.53, "rgba(255,255,230,0.6)");
          grad.addColorStop(0.65, "rgba(255,248,200,0)");
          grad.addColorStop(1, "rgba(255,248,200,0)");
          ctx.fillStyle = grad;
          ctx.fillRect(x - 80, 0, 160, h);
          ctx.globalCompositeOperation = "source-over";
          progress += 0.007;
          if (progress > 1.3) {
            waiting = true;
            waitStart = timestamp;
            progress = -0.3;
          }
        } else {
          if (timestamp - waitStart > 3000) waiting = false;
        }

        ctx.restore();
        animRef.current = requestAnimationFrame(draw);
      };

      animRef.current = requestAnimationFrame(draw);
    };

    document.fonts.ready.then(setup);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [text, fontSize, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "inline-block",
        verticalAlign: "text-bottom",
        position: "relative",
        top: "0em",
      }}
    />
  );
};
