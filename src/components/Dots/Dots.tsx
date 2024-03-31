import { QUERIES } from "breakpoints";
import { RefObject, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  draw,
  getLines,
  getMouseLeaveHandler,
  getMouseMoveHandler,
  MouseHandlerProps,
} from "./helpers";
import React from "react";

export interface IProps {
  delegated?: any;
  boundingRect: RefObject<HTMLDivElement>;
}

const Template: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  boundingRect,
  ...delegated
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    console.log("lines: ", lines);
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

  return <Wrapper ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

const Wrapper = styled.canvas`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};

  ${QUERIES.desktopAndUp} {
    display: block;
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export default React.memo(Template);
