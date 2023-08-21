import Button from "@/components/Button";
import { QUERIES } from "breakpoints";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Highlight from "../Highlight";
import Link from "../Link";

const Hero = () => {
    const scrollToContact = () => {
        const contact = document.getElementById("contact");
        contact!.scrollIntoView({ behavior: "smooth" });
    };

    const [canvasHeight, setCanvasHeight] = useState(0);
    const [canvasWidth, setCanvasWidth] = useState(0);
    const boundingRect = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [dimensions, setDimensions] = useState({
        height: 0,
        width: 0,
    });

    // TODO: Refactor this into a custom hook
    const draw = (
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        xOffset: number,
        yOffset: number
    ) => {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "hsla(44, 100%, 69%, 0.3)";
        ctx.lineCap = "round";

        interface ILine {
            start_x: number;
            start_y: number;
            end_x: number;
            end_y: number;
            length: number;
        }

        let base_line: ILine = {
            start_x: 0,
            start_y: 0,
            end_x: centerX + 20,
            end_y: centerY + 20,
            length: 18,
        };

        const lines: ILine[] = [];

        const x_gap = 50;
        const y_gap = 50;
        const grid_size_x = 120;
        const grid_size_y = 20;

        for (let i = 0; i < grid_size_x; i++) {
            for (let j = 0; j < grid_size_y; j++) {
                const line = {
                    start_x: Math.floor(base_line.start_x + i * x_gap),
                    start_y: Math.floor(base_line.start_y + j * y_gap),
                    end_x: Math.floor(base_line.end_x + i * x_gap),
                    end_y: Math.floor(base_line.end_y + j * y_gap),
                    length: Math.floor(base_line.length),
                };
                lines.push(line);
            }
        }

        function updateLine(line: ILine, x: number, y: number) {
            const dx = x - xOffset - line.start_x + window.scrollX;
            const dy = y - yOffset - line.start_y + window.scrollY;

            const length = Math.sqrt(dx * dx + dy * dy);

            const unitX = dx / length;
            const unitY = dy / length;

            const scale = 1 - Math.min(1, length / 200);

            const lineEndX = line.start_x + unitX * line.length * scale;
            const lineEndY = line.start_y + unitY * line.length * scale;

            line.end_x = Math.floor(lineEndX);
            line.end_y = Math.floor(lineEndY);
        }

        function drawLine(line: ILine) {
            if (line.end_x === line.start_x && line.end_y === line.start_y) {
                ctx.beginPath();
                ctx.roundRect(
                    line.start_x - 2.5,
                    line.start_y - 2.5,
                    5,
                    5,
                    999
                );
                ctx.fillStyle = "hsla(44, 100%, 69%, 0.3)";
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.moveTo(line.start_x, line.start_y);
                ctx.lineTo(line.end_x, line.end_y);
                ctx.stroke();
            }
        }

        function updateAllLines(x: number, y: number) {
            lines.forEach((line) => {
                updateLine(line, x, y);
            });
        }

        function drawAllLines() {
            lines.forEach((line) => {
                drawLine(line);
            });
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas!.width, canvas!.height);
        }

        canvas.addEventListener("mousemove", (event) => {
            // get the current mouse position relative to the canvas
            let x = event.clientX - canvas.offsetLeft;
            let y = event.clientY - canvas.offsetTop;

            // clear the canvas
            clearCanvas();
            updateAllLines(x, y);
            drawAllLines();
        });

        canvas.addEventListener("mouseleave", (event) => {
            // clear the canvas
            clearCanvas();
            updateAllLines(999999, 999999);
            drawAllLines();
        });
    };

    const handleResize = () => {
        setDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
        });

        console.log("resize");
    };

    const debounce = (func: any, wait = 20, immediate = false) => {
        let timeout: any;
        return function () {
            // @ts-ignore
            let context = this,
                args = arguments;
            let later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };

            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    const debouncedHandleResize = debounce(handleResize);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;
        const currentRect = boundingRect.current;
        if (!currentRect) return;
        const { top, left } = currentRect.getBoundingClientRect();

        const ctx = context;

        setCanvasHeight(currentRect.clientHeight - 25);
        setCanvasWidth(currentRect.clientWidth);

        window.addEventListener("resize", debouncedHandleResize);

        draw(canvas, ctx, left, top);
    }, [canvasHeight, canvasWidth, dimensions, debouncedHandleResize]);

    return (
        <Wrapper ref={boundingRect}>
            <Canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
            <ContentWrapper>
                <Text>
                    <Highlight>Hi, my name is</Highlight>
                </Text>
                <Name>Pawan Bhandarkar.</Name>
                <SubText>I build for everyone</SubText>
                <Text>
                    I’m a full-stack engineer specialising in building (and
                    sometimes designing) highly accessible, human-centered
                    applications for the web. Currently, I’m pursuing a Master’s
                    degree in Computer Science at{" "}
                    <Link
                        href="https://www.cmu.edu"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <Highlight>Carnegie Mellon University</Highlight>
                    </Link>
                </Text>
                <CallToAction onClick={scrollToContact}>
                    Get In Touch
                </CallToAction>
            </ContentWrapper>
        </Wrapper>
    );
};

const Canvas = styled.canvas`
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.background};

    ${QUERIES.desktopAndUp} {
        display: block;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    /* overflow: hidden; */
    background-color: ${({ theme }) => theme.colors.background};
`;

const ContentWrapper = styled.div`
    align-self: center;
    max-width: min-content;
    min-height: calc(100vh - 150px);
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    z-index: 2;
    pointer-events: none;
`;

const Name = styled.h2`
    white-space: nowrap;
    font-size: calc(35 / 16 * 1rem);
    margin-bottom: -16px;

    ${QUERIES.tabletAndUp} {
        font-size: calc(64 / 16 * 1rem);
        margin-bottom: -32px;
    }

    ${QUERIES.desktopAndUp} {
        font-size: calc(80 / 16 * 1rem);
        margin-bottom: -32px;
    }
`;

const SubText = styled.h3`
    color: ${({ theme }) => theme.colors.text.light};
    font-size: calc(35 / 16 * 1rem);
    margin-bottom: 24px;

    ${QUERIES.tabletAndUp} {
        font-size: calc(64 / 16 * 1rem);
    }

    ${QUERIES.desktopAndUp} {
        font-size: calc(80 / 16 * 1rem);
    }
`;

const Text = styled.p`
    color: ${({ theme }) => theme.colors.text.regular};
    font-weight: 400;
    margin-bottom: -4px;

    ${QUERIES.tabletAndUp} {
        margin-bottom: -8px;
    }
`;

const CallToAction = styled(Button)`
    margin-top: 32px;
    pointer-events: all;
`;

export default Hero;
