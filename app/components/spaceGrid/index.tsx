'use client';

import { useEffect } from "react";
import { SpaceGrid as Space } from "../../data/space-grid";

export default function SpaceGrid() {
  useEffect(() => {
    const canvas = document.getElementById('space') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (canvas && ctx) {
      const space = new Space(canvas, ctx, 1000);
      space.draw();
    }
  }, []);

  return (
    <div className="bg-black overflow-hidden" style={{top: 0, left: 0, position: 'fixed', height: '100hw', width: '100vw'}}>
      <canvas id="space" className="bg-black h-screen w-screen overflow-hidden" style={{zIndex: 10}}></canvas>
    </div>
  );
}
