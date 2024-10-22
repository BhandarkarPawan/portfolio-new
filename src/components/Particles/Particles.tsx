"use client";

import React, { useRef, useEffect } from "react";

interface MousePosition {
  x: number | null;
  y: number | null;
  radius: number;
}

class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
  speedFactor: number;
  canvasWidth: number;
  canvasHeight: number;

  // Physics properties
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  mass: number;
  damping: number;

  constructor(
    x: number,
    y: number,
    directionX: number,
    directionY: number,
    size: number,
    color: string,
    canvasWidth: number,
    canvasHeight: number
  ) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.speedFactor = 0.2;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    // Initialize physics properties with base velocity
    this.vx = this.directionX * this.speedFactor;
    this.vy = this.directionY * this.speedFactor;
    this.ax = 0;
    this.ay = 0;
    this.mass = 1; // You can vary mass if needed
    this.damping = 0.95; // Slightly higher damping for smoother deceleration
  }

  // Draw the particle on the canvas
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // Apply force to the particle
  applyForce(fx: number, fy: number) {
    this.ax += fx / this.mass;
    this.ay += fy / this.mass;
  }

  // Update particle position and handle interactions
  update(mouse: MousePosition, ctx: CanvasRenderingContext2D) {
    // Bounce off the walls with damping
    if (this.x + this.vx > this.canvasWidth || this.x + this.vx < 0) {
      this.vx = -this.vx * this.damping;
    }
    if (this.y + this.vy > this.canvasHeight || this.y + this.vy < 0) {
      this.vy = -this.vy * this.damping;
    }

    // Mouse interaction
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius + this.size) {
        // Calculate the direction away from the mouse
        const angle = Math.atan2(dy, dx);
        const force = (mouse.radius + this.size - distance) / mouse.radius; // Force magnitude
        const fx = Math.cos(angle) * force * 2; // Multiplier for effect strength
        const fy = Math.sin(angle) * force * 2;

        // Apply the force to the particle
        this.applyForce(-fx, -fy); // Negative to repel
      }
    }

    // Optional: Apply subtle random forces for organic movement
    const randomForceStrength = 0.05; // Adjust for desired randomness
    const randomAngle = Math.random() * Math.PI * 2;
    this.applyForce(
      Math.cos(randomAngle) * randomForceStrength,
      Math.sin(randomAngle) * randomForceStrength
    );

    // Update velocity with acceleration
    this.vx += this.ax;
    this.vy += this.ay;

    // Apply damping to velocity
    this.vx *= this.damping;
    this.vy *= this.damping;

    // Update position with velocity
    this.x += this.vx;
    this.y += this.vy;

    // Reset acceleration
    this.ax = 0;
    this.ay = 0;

    // Draw the particle
    this.draw(ctx);
  }
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesArrayRef = useRef<Particle[]>([]);
  const mouseRef = useRef<MousePosition>({
    x: null,
    y: null,
    radius: 150, // Adjusted radius for smoother interaction
  });

  // Initialize particles
  const initParticles = (canvasWidth: number, canvasHeight: number) => {
    particlesArrayRef.current = [];
    const numberOfParticles = (canvasWidth * canvasHeight) / 5000; // Adjust as needed

    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 7 + 1; // Size between 1 and 8
      const x = Math.random() * (canvasWidth - size * 2) + size * 2;
      const y = Math.random() * (canvasHeight - size * 2) + size * 2;
      const directionX = Math.random() * 2 - 1; // Between -1 and 1
      const directionY = Math.random() * 2 - 1; // Between -1 and 1
      const color = `rgba(198, 234, 141, ${Math.random() * 0.3 + 0.2})`; // Opacity between 0.2 and 0.5

      particlesArrayRef.current.push(
        new Particle(
          x,
          y,
          directionX,
          directionY,
          size,
          color,
          canvasWidth,
          canvasHeight
        )
      );
    }
  };

  // Animation loop
  const animate = (
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    animationRef.current = requestAnimationFrame(() =>
      animate(ctx, canvasWidth, canvasHeight)
    );
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    particlesArrayRef.current.forEach((particle) => {
      particle.canvasWidth = canvasWidth;
      particle.canvasHeight = canvasHeight;
      particle.update(mouseRef.current, ctx);
    });

    // Optional: Draw connection lines between particles
    // Uncomment the following block to enable connection lines

    for (let i = 0; i < particlesArrayRef.current.length; i++) {
      for (let j = i + 1; j < particlesArrayRef.current.length; j++) {
        const dx =
          particlesArrayRef.current[i].x - particlesArrayRef.current[j].x;
        const dy =
          particlesArrayRef.current[i].y - particlesArrayRef.current[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          // Threshold distance
          ctx.strokeStyle = `rgba(198, 234, 141, ${1 - distance / 42})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(
            particlesArrayRef.current[i].x,
            particlesArrayRef.current[i].y
          );
          ctx.lineTo(
            particlesArrayRef.current[j].x,
            particlesArrayRef.current[j].y
          );
          ctx.stroke();
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouseRef.current.radius = 150; // Adjusted radius on resize
      initParticles(canvas.width, canvas.height);
    };

    setCanvasSize();

    // Initialize particles
    initParticles(canvas.width, canvas.height);

    // Start animation
    animate(ctx, canvas.width, canvas.height);

    // Mouse move event
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    // Mouse out event
    const handleMouseOut = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    // Resize event
    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Ensure the canvas is in the background
      }}
    ></canvas>
  );
};

export default ParticleBackground;
