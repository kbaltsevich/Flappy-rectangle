const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

document.addEventListener("click", moveUp);
document.addEventListener("keydown", moveUp)

const pipeHeight = 320;
let pips = [
  {
    x: canvas.width,
    y: Math.floor(Math.random() * pipeHeight) - pipeHeight,
  },
];
const gravitaton = 0.9;
const bird = {
  x: 30,
  y: 200,
};
let scoupe = 0;
function moveUp() {
  bird.y -= 25;
}

const createPipe = (i) => {
  ctx.fillStyle = "yellow"
  ctx.fillRect(pips[i].x, pips[i].y, 50, pipeHeight);
  ctx.fillRect(pips[i].x, pips[i].y + pipeHeight + 90, 50, canvas.height);
};

const addPipe = () => {
  pips.push({
    x: canvas.width,
    y: Math.floor(Math.random() * pipeHeight) - pipeHeight,
  });
};

const addText = (text) => {
  ctx.font = "40px Verdana";
  ctx.fillStyle = "#ff0000";
  ctx.lineWidth = 2;
  ctx.fillText(`${text}`, canvas.width / 2 - 20, 50);
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
      location.reload();
    }
    if (
      bird.x + 20 >= pips[i].x &&
      bird.x <= pips[i].x + 50 &&
      (bird.y <= pips[i].y + pipeHeight ||
        bird.y + 20 >= pips[i].y + pipeHeight + 90)
    ) {
      location.reload();
    }
    if (pips[i].x == 10) {
      scoupe++;
    }
  }
  addText(scoupe);
  bird.y += gravitaton;


  requestAnimationFrame(draw);
};

draw();