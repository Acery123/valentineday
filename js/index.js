let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let canvas = document.getElementById('alx');
let ctx = canvas.getContext('2d');

let dots = [];
let hearts = [];

canvas.width = WIDTH;
canvas.height = HEIGHT;

let dotCount = 32 + 16 + 8;
let yVal = 6.3;

const steps = [0.2, 0.4, 0.8];
const coefficients = [[210, 13], [150, 9], [90, 5]];

for (let s = 0; s < steps.length; s++) {
  for (let i = 0; i < yVal; i += steps[s]) {
    let sinVal = Math.sin(i);
    let cosVal = Math.cos(i);
    let x = WIDTH / 2 + coefficients[s][0] * Math.pow(sinVal, 3);
    let y = HEIGHT / 2 + coefficients[s][1] * -(15 * cosVal - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
    hearts.push([x, y]);
  }
}

for (let i = 0; i < dotCount; i++) {
  x = Math.random() * WIDTH;
  y = Math.random() * HEIGHT;
  H = 80 * (i / dotCount) + Math.random * 100;
  S = 40 * Math.random() + 60;
  B = 60 * Math.random() + 20;
  f = [];

  for (let k = 0; k < dotCount; k++) {
    f[k] = {
      x: x,
      y: y,
      X: 0,
      Y: 0,
      R: 1 - k / dotCount + 1,
      S: Math.random() + 1,
      q: Math.floor(Math.random() * dotCount),
      D: 2 * (i % 2) - 1,
      F: 0.2 * Math.random() + 0.7,
      f: "hsla(" + ~~H + "," + ~~S + "%," + ~~B + "%,.1)"
    };
  }
  dots[i] = f;
}


const path = (d) => {
  ctx.fillStyle = d.f;
  ctx.beginPath();
  ctx.arc(d.x, d.y, d.R, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
};

let wait;

function startAnimation() {
  clearTimeout(wait);
  wait = setTimeout(function () {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    updateDots();
  }, 500);
}

window.addEventListener("resize", startAnimation);


function updateDots() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.font = "23px Arial";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("Feionna <3", WIDTH / 2, HEIGHT / 2);

  for (let i = 0; i < dotCount; i++) {
    const dot = dots[i][0];
    const heart = hearts[dot.q];
    const xDiff = dot.x - heart[0];
    const yDiff = dot.y - heart[1];
    const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

    if (distance < 10) {
      dot.q = Math.random() > 0.95 ? Math.floor(Math.random() * dotCount) : (dot.q + (Math.random() > 0.99 ? dot.D *= -1 : 1) + dotCount) % dotCount;
    }

    dot.X = dot.X - xDiff / distance * dot.S;
    dot.Y = dot.Y - yDiff / distance * dot.S;
    dot.x = dot.x + dot.X;
    dot.y = dot.y + dot.Y;
    path(dot);
    dot.X *= dot.F;
    dot.Y *= dot.F;

    for (let k = 0; k < dotCount - 1; k++) {
      const currentDot = dots[i][k];
      const nextDot = dots[i][k + 1];
      nextDot.x = nextDot.x - 0.7 * (nextDot.x - currentDot.x);
      nextDot.y = nextDot.y - 0.7 * (nextDot.y - currentDot.y);
      path(nextDot);
    }
  }

  requestAnimationFrame(updateDots);
}

startAnimation();
