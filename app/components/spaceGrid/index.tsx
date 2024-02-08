'use client';

import { useEffect } from "react";
import { SpaceGrid as Space } from "@/app/data/space-grid";



export default function SpaceGrid() {
  // full screen sized grid of space with stars and planets using tailwind css and canvas

  // draw stars and planets in the canvas
  useEffect(() => {
    const canvas: HTMLCanvasElement | null = document.getElementById('space') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (canvas && ctx) {
      const space = new Space(canvas, ctx, 1000);
      space.draw();
    }
  }, []);

  return (
    <div className="bg-black h-screen w-screen">
      <canvas id="space" className="h-full w-full"></canvas>
    </div>
  );
}