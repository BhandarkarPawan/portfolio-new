import { useEffect, useRef } from "react";
import {
  draw,
  getLines,
  getMouseLeaveHandler,
  getMouseMoveHandler,
  MouseHandlerProps,
} from "./helpers";
import React from "react";
import styles from "./Dots.module.css";

export interface IProps {
  delegated?: any;
}

const Dots: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  ...delegated
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boundingRect = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = React.useState(0);
  const [canvasHeight, setCanvasHeight] = React.useState(0);

  const color = "hsla(0, 0%, 60%, 0.5)";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const currentRect = boundingRect.current;

    if (!currentRect) return;
    const { top, left } = currentRect.getBoundingClientRect();

    const ctx = context;

    const lines = getLines(canvas);
    const mouseHandlerProps: MouseHandlerProps = {
      canvas: canvas,
      ctx: context,
      xOffset: left,
      yOffset: top,
      lines: lines,
      color: color,
    };

    const handleMouseMove = getMouseMoveHandler(mouseHandlerProps);
    const handleMouseLeave = getMouseLeaveHandler(mouseHandlerProps);

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    draw(ctx, lines, color);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [boundingRect.current, canvasRef.current]);

  useEffect(() => {
    const currentRect = boundingRect.current;
    const canvasHeight = currentRect ? currentRect.clientHeight - 25 : 0;
    const canvasWidth = currentRect ? currentRect.clientWidth : 0;
    setCanvasHeight(canvasHeight);
    setCanvasWidth(canvasWidth);
  }, [boundingRect.current]);

  return (
    <div className={styles.wrapper} ref={boundingRect}>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      />
      {children}
    </div>
  );
};

export default React.memo(Dots);
