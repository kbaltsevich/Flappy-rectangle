const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

document.addEventListener("click", moveUp);
document.addEventListener("keydown", moveUp)

const pipeHeight = 320;
let pips = [
  {
    pipeColor: `#${(Math.random().toString(16)+'000000').substring(2,8).toUpperCase()}`,
    pipeWidth: +`${Math.floor(Math.random()*(Math.floor(60) - Math.ceil(20))) + Math.ceil(20)}`,
    x: canvas.width,
    y: Math.floor(Math.random() * pipeHeight) - pipeHeight,
  },
];
const bird = {
  x: 30,
  y: 200,
};
let scoupe = 0;
let record = 0
function moveUp() {
  bird.y -= +`${Math.floor(Math.random()*(Math.floor(35) - Math.ceil(10))) + Math.ceil(10)}`;
}

const createPipe = (i) => {
  ctx.fillStyle = pips[i].pipeColor
  ctx.fillRect(pips[i].x, pips[i].y, pips[i].pipeWidth || 50, pipeHeight);
  ctx.fillRect(pips[i].x, pips[i].y + pipeHeight + 90, pips[i].pipeWidth || 50, canvas.height);
};

const addPipe = () => {
  pips.push({
    pipeColor: `#${(Math.random().toString(16)+'000000').substring(2,8).toUpperCase()}`,
    pipeWidth: +`${Math.floor(Math.random()*(Math.floor(60) - Math.ceil(20))) + Math.ceil(20)}`,
    x: canvas.width,
    y: Math.floor(Math.random() * pipeHeight) - pipeHeight,
  });
};

const addText = (text) => {
  ctx.font = "40px Verdana";
  ctx.fillStyle = "#ff0000";
  ctx.lineWidth = 2;
  ctx.fillText(`Очки:${text}`, canvas.width / 2 - 50, 50);
};

const addRecord = (text) => {
  ctx.font = "40px Verdana";
  ctx.fillStyle = "#ff0000";
  ctx.lineWidth = 2;
  ctx.fillText(`Рекорд: ${text}`, 50, canvas.height - 20);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  ctx.fillRect(bird.x, bird.y, 20, 20);
  for (let i = 0; i < pips.length; i++) {
    createPipe(i);
    pips[i].x--;
    if (pips[i].x == 125) {
      addPipe();
    }
    if (bird.y + 20 >= canvas.height) {
      let reload = confirm('Eще?')
      if(reload){
        return location.reload();
      } else {
        window.close()
      }
    }
    if (
      bird.x + 20 >= pips[i].x &&
      bird.x <= pips[i].x + pips[i].pipeWidth &&
      (bird.y <= pips[i].y + pipeHeight ||
        bird.y + 20 >= pips[i].y + pipeHeight + 90)
    ) {
      document.removeEventListener("click", moveUp);
      document.removeEventListener("keydown", moveUp)
      let reload = confirm('Eще?')
      if(reload){
        return location.reload();
      } else {
        window.close()
      }
    }
    if (pips[i].x == 10) {
      scoupe++;
      record++
    }
    if(!localStorage.getItem('flappy-rectangle-record')){
      localStorage.setItem('flappy-rectangle-record', record)
    }
    if(localStorage.getItem('flappy-rectangle-record') < record){
      localStorage.setItem('flappy-rectangle-record', record)
    }
  }
  addText(scoupe);
  addRecord(localStorage.getItem('flappy-rectangle-record')||record)
  bird.y += +`${Math.floor(Math.random()*(Math.floor(1.5) - Math.ceil(0.8))) + Math.ceil(0.8)}`;


  requestAnimationFrame(draw);
};

draw();
