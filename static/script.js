const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let scoupe = 0;
let record = 0;
let userName = '';
const pipeHeight = 320;
const gravitaton = () => +`${Math.floor(Math.random()*(Math.floor(1.5) - Math.ceil(0.8))) + Math.ceil(0.8)}`;
const pipeRandomWidth = () => +`${Math.floor(Math.random()*(Math.floor(60) - Math.ceil(20))) + Math.ceil(20)}`;
const pipeRandomColod = () => `#${(Math.random().toString(16)+'000000').substring(2,8).toUpperCase()}`;
const birdRandomJump = () => +`${Math.floor(Math.random()*(Math.floor(35) - Math.ceil(10))) + Math.ceil(10)}`;
const isEnd = () => {
  document.removeEventListener("click", moveUp);
  document.removeEventListener("keydown", moveUp)
  let reload = confirm('Eще?')
  if(reload){
    return location.reload();
  } else {
    return window.close()
  }
}
const createPipe = (i) => {
  ctx.fillStyle = pips[i].pipeColor
  ctx.fillRect(pips[i].x, pips[i].y, pips[i].pipeWidth || 50, pipeHeight);
  ctx.fillRect(pips[i].x, pips[i].y + pipeHeight + 90, pips[i].pipeWidth || 50, canvas.height);
};
const bird = {
  x: 30,
  y: 200,
};
let pips = [
  {
    pipeColor: pipeRandomColod(),
    pipeWidth: pipeRandomWidth(),
    x: canvas.width,
    y: Math.floor(Math.random() * pipeHeight) - pipeHeight,
  },
];
const addPipe = () => {
  pips.push({
    pipeColor: pipeRandomColod(),
    pipeWidth: pipeRandomWidth(),
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
function moveUp() {
  bird.y -= birdRandomJump();
}
const draw = () => {
  if(!localStorage.getItem('flappy-rectangle-name')){
    userName = prompt('Ваше имя?')
    localStorage.setItem('flappy-rectangle-name', userName)
  } else {
    userName = localStorage.getItem('flappy-rectangle-name')
  }
  document.addEventListener("click", moveUp);
  document.addEventListener("keydown", moveUp);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  ctx.fillRect(bird.x, bird.y, 20, 20);
  for (let i = 0; i < pips.length; i++) {
    createPipe(i);
    pips[i].x--;
    if (pips[i].x == 105) {
      addPipe();
    }
    if (bird.y + 20 >= canvas.height) {
      isEnd()
    }
    if (
      bird.x + 20 >= pips[i].x &&
      bird.x <= pips[i].x + pips[i].pipeWidth &&
      (bird.y <= pips[i].y + pipeHeight ||
        bird.y + 20 >= pips[i].y + pipeHeight + 90)
    ) {
      isEnd()
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
  bird.y += gravitaton();
  requestAnimationFrame(draw);
};
draw();

