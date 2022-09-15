const canvasSketch = require('canvas-sketch');

// Sketch parameters
const settings = {
  dimensions: [1080,1080]
};

// Artwork function
const sketch = () => {
  return ({ context, width, height }) => {
    // Off-white background
    context.fillStyle = 'black';
    context.strokeStyle = '#FFFFFF';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.013;

    const width_rec = width * 0.1;
    const height_rec = height * 0.1;
    const gap = width * 0.03;
    const iy = height * 0.18;
    const ix = width * 0.18;
    let x,y;

    const off = width * 0.02;
            
    for(let i = 0; i < 5; i++)
    {
        for(let j = 0; j < 5; j++)
        {
            x = ix + (width_rec + gap) * i;
            y = iy + (width_rec + gap) * j;
            
            context.beginPath();
            context.rect(x ,y, width_rec, height_rec);
            context.stroke();
            
            if(Math.floor(Math.random() * 100) % 5 > 2)
            {
                context.beginPath();
                context.rect(x + off/2, y + off/2, width_rec - off, height_rec - off);
                context.stroke();
            }
        }
    }

  };
};

// Start the sketch
canvasSketch(sketch, settings);