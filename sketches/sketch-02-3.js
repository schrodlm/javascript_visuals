const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = ({ context, width, height }) => {
  
  const circles = [];
  let count = 0;
  circles.push(new Agent(1));

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);


    circles.forEach(circle => {
      circle.draw(context);
      circle.update();
      
      if(circle.radius.r >= Math.sqrt(1080 * 1080 + 1080 * 1080))
      {
        console.log(circle.radius.r);
        circles.splice(circle,1);
      }

    });
    if(count % 25 == 0)
    {
    circles.push(new Agent(1));
    }
    
    count ++;

  };
};

canvasSketch(sketch, settings);


class Radius{
  constructor(r)
  {
    this.r = r;
    this.lwidth = random.range(4,13);
  }
}

class Agent{
  constructor(r)
  {
    this.radius = new Radius(r);
  }
  update()
  {
    this.radius.r += 2;
  }

  draw(context)
  {
    context.beginPath();
    context.lineWidth = this.radius.lwidth;
    context.arc(0,0, this.radius.r,0, Math.PI * 2);
    context.fill();
    context.stroke();
  }

}