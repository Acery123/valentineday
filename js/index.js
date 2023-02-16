let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let canvas = document.getElementById('heartanimated');
let ctx = canvas.getContext('2d');

let dots = [];
let hearts = [];

/*
- canvas is an HTML canvas element that is selected from the document.
- and ctx is its 2D rendering context.
- dots and hearts are arrays that will store information about the dots and heart shape.
*/

canvas.width = WIDTH;
canvas.height = HEIGHT;

let dotCount = 32 + 16 + 8;
let yValue = 6.3;

/*
- dotCount is the total number of dots that will be used to form the heart shape. 
- yVal is a value used in the calculation of the heart shape.
*/

const steps = [0.2, 0.4, 0.8];
const coefficients = [[210, 13], [150, 9], [90, 5]];

/*
- Steps is an array of step sizes for the loop
- Coefficients is a nested array that contains coefficients used in the calculation of the heart shape.
*/

for (let s = 0; s < steps.length; s++) {
  for (let i = 0; i < yValue; i += steps[s]) {
    let sinVal = Math.sin(i);
    let cosVal = Math.cos(i);
    let x = WIDTH / 2 + coefficients[s][0] * Math.pow(sinVal, 3);
    let y = HEIGHT / 2 + coefficients[s][1] * -(15 * cosVal - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
    hearts.push([x, y]);
  }
}
/*
A for loop is used to calculate the heart shape. 
The outer loop iterates over the elements in the steps array
The inner loop iterates over values of i with a step size equal to the current step value. 
For each iteration, The sine and cosine values of i are calculated and used in the calculation of the heart shape coordinates. 
The resulting coordinates are pushed into the hearts array.
*/

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
/*
A for loop is used to calculate the dots that will form the heart shape. 
The loop iterates dotCount times and for each iteration
a set of dot properties are calculated and pushed into the dots array.
*/

const path = (d) => {
  ctx.fillStyle = d.f;
  ctx.beginPath();
  ctx.arc(d.x, d.y, d.R, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
};

/*
The path is a function that draws the dots on the canvas using the fillStyle property of the context and the arc method.
*/

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
/*
A timeout is set with the setTimeout method in the startAnimation function, 
which calls the updateDots function after 500 milliseconds. 
The resize event is also listened for with window.addEventListener, and when it occurs, the startAnimation function is called to adjust the canvas size.
*/

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

/*
The updateDots function is used to update the dots and draw them on the canvas. 
It first fills the canvas with a translucent black color, then draws text in the center of the canvas.

A for loop is used to iterate over the dots, and for each iteration, the dot is moved towards its assigned heart shape point. 
The dot's position and velocity are updated, and the dot is drawn on the canvas using the path function.

Finally, a for loop is used to copy the dot properties of each dot to the next dot in the array, creating a trail effect.
*/

startAnimation();
/*
This startAnimation just starts the animated and if any changes, it restart the Animated.
*/
