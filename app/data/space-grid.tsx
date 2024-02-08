'use client';

class Star {
  // create individual star data and move it
  private x: number;
  private y: number;
  private z: number;
  private pz: number;
  private speed: () => number;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * canvas.width;
    this.pz = this.z;
    this.speed = () => 0.1;
    this.canvas = canvas;
    this.ctx = ctx;    
  }

  move() {
    this.z = this.z - this.speed();
    if (this.z < 1) {
      this.z = this.canvas.width;
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.pz = this.z;
    }
  }

  show() {
    this.ctx.fillStyle = 'white';
    const sx = this.x / this.z * this.canvas.width;
    const sy = this.y / this.z * this.canvas.height;
    const r = 16 / this.z;
    this.ctx.beginPath();
    this.ctx.arc(sx, sy, r, 0, Math.PI * 2);
    this.ctx.fill();
    const px = this.x / this.pz * this.canvas.width;
    const py = this.y / this.pz * this.canvas.height;
    this.pz = this.z;
    this.ctx.strokeStyle = 'white';
    this.ctx.beginPath();
    this.ctx.moveTo(px, py);
    this.ctx.lineTo(sx, sy);
    this.ctx.stroke();
  }

  update() {
    this.move();
    this.show();
  }
}


export class SpaceGrid {
  // create all stars and move them
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private stars: Star[] = [];

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, numStars: number) {
    this.canvas = canvas;
    this.ctx = ctx;
    for (let i = 0; i < numStars; i++) {
      this.stars.push(new Star(canvas, ctx));
    }
  }

  draw() {
    // also request animation frame
    requestAnimationFrame(() => this.draw());
    this.ctx.fillStyle = 'black';
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].update();
    }
  }

  update() {
    this.draw();
  }

}