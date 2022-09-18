const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const cx = width * 0.5;
    const cy = height * 0.5;

    const w = width * 0.01;
    const h = width * 0.1;
    let x,y;

    const loop_count = 12;
    const radius = width * 0.1; // 1080 * 0.3
    const slice = math.degToRad(360/loop_count); // degToRoad(360 / 12) 


    for(let i = 0; i < loop_count*10; i++)
    {
      context.beginPath();
      context.lineWidth = random.range(1,7);
      context.arc(0,0, random.range(70,100) * i * 0.5, 0, Math.PI*2);
      context.stroke();
    
    }
  };
};

canvasSketch(sketch, settings);


class Radius{
  constructor(r)
  {
    this.r = r;
  }
}

class Agent{
  constructor(r)
  {
    this.radius = new Radius(r);
  }

  draw(context)
  {
    context.lineWidth = 4;
    context.beginPath();
    context.arc(0,0, r, Math.PI * 2);
    context.stroke();
  }
}