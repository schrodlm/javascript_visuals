const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080 , 1080 ]
};

let manager;

let text = 'h';
let fontSize = '1200';
let fontFamily = 'Courier New';

//vytvoření vlastního canvasu
const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {

  //CREATING GRID
  //one cell of specified size
  const cell = 20;
  const cols = Math.floor(width/cell);
  const rows = Math.floor(height/cell);
  const numCells = cols * rows;

  // proportions for my canvas
  typeCanvas.width = cols;
  typeCanvas.height = rows;

  fontSize = cols;

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, width, height);

    typeContext.fillStyle = 'orange';
    //typeContext.font = fontSize + 'px' + fontFamily;
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = 'top';
    
    //tady "měřím" text s kterým pracuju a podle toho ho vykresluju aby byl presně ve středu
    // kazdy font ma totiz trosku jine postaveni pismen atd.
    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(tx, ty);
    
    typeContext.beginPath();
    typeContext.rect(mx,my,mw,mh);
    typeContext.stroke();
    
    typeContext.fillText(text,0,0);
    typeContext.restore();

    //extrakce informaci z mnou vytvořeného canvasu
    const typeData = typeContext.getImageData(0,0,cols,rows).data;
    console.log(typeData);
    

    // tady barvím jednotlivé buňky v mnou vytvořeném gridu 
    // podle toho co jsem extractnul z mnou vytvořeného canvasu
    for(let i = 0; i < numCells; i++)
    {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      context.fillStyle = `rgb(${r},${g},${b})`;


      context.save();
      context.translate(x,y);
      context.translate(cell * 0.5, row * 0.5);

      context.beginPath();
      context.arc(0,0,cell / 2,0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    context.drawImage(typeCanvas,0,0);
  };
};

const onKeyUp = (e) =>{
  text = e.key.toUpperCase();
  manager.render();
}

document.addEventListener('keyup', onKeyUp);


const start = async() => {
  manager = await canvasSketch(sketch,settings);
}

start();

// const url = 'https://picsum.photos/200';

// const loadSomeImage = (url) => {
//   return new Promise((resolve,reject) => {
//     const img = new Image();
//     img.onload = () => resolve(img);
//     img.onerror = () => reject();
//     img.src = url;
//   });
// };

// // const start = () => {
// //   loadSomeImage(url).then(img => {
// //     console.log('image width', img.width);
// //   });
// //   console.log('this line');
// // };
// const start = async () => {
  
//     const img = await loadSomeImage(url);
//     console.log('image width', img.width);
//   };
// start();