let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let canvas = document.getElementById('alx');
let ctx = canvas.getContext('2d');

let dots = [];
let hearts = [];

canvas.width = WIDTH;
canvas.height = HEIGHT;

let dotCount = 32 + 16 + 8;
let random = Math.random;
let cos = Math.cos;
let yVal = 6.3;


for (let i = 0; i < yVal; i += 0.2) {
  hearts.push([
    WIDTH / 2 + 210 * Math.pow(Math.sin(i), 3),
    HEIGHT / 2 + 13 * -(15 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i))
  ]);
}

for (let i = 0; i < yVal; i += 0.4) {
  hearts.push([
    WIDTH / 2 + 150 * Math.pow(Math.sin(i), 3),
    HEIGHT / 2 + 9 * -(15 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i))
  ]);
}

for (let i = 0; i < yVal; i += 0.8) {
  hearts.push([
    WIDTH / 2 + 90 * Math.pow(Math.sin(i), 3),
    HEIGHT / 2 + 5 * -(15 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i))
  ]);
}


  for (let i = 0; i < dotCount;) {
    x = random() * WIDTH;
    y = random() * HEIGHT;
    H = 80 * (i / dotCount) + Math.random * 100;
    S = 40 * random() + 60;
    B = 60 * random() + 20;
    f = [];
  for (let k = 0; k < dotCount;) {
    f[k++] = {
      x: x,
      y: y,
      X: 0,
      Y: 0,
      R: 1 - k / dotCount + 1,
      S: random() + 1,
      q: Math.floor(random() * dotCount),
      D: 2 * (i % 2) - 1,
      F: 0.2 * random() + 0.7,
      f: "hsla(" + ~~H + "," + ~~S + "%," + ~~B + "%,.1)"
    };
  }
  dots[i++] = f;
}

      function path(d) {
        ctx.fillStyle = d.f;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.R, 0, yVal, 1);
        ctx.closePath();
        ctx.fill();
      }

      function updateDots() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      
        for (let i = 0; i < dotCount; i++) {
          const dot = dots[i][0];
          const heart = hearts[dot.q];
          const xDiff = dot.x - heart[0];
          const yDiff = dot.y - heart[1];
          const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
      
          if (distance < 10) {
            if (random() > 0.95) {
              dot.q = Math.floor(random() * dotCount);
            } else {
              if (random() > 0.99) {
                dot.D *= -1;
              }
              dot.q = (dot.q + dot.D + dotCount) % dotCount;
            }
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
        
      let wait;

      function startAnimation() {
        clearTimeout(wait); // clear the timeout if it was set
        wait = setTimeout(function() {
          WIDTH = window.innerWidth;
          HEIGHT = window.innerHeight;
          canvas.width = WIDTH;
          canvas.height = HEIGHT;
          updateDots();
        }, 500); // wait 500 milliseconds before starting the animation
      }
      
      window.addEventListener("resize", startAnimation); // restart the animation on resize


        requestAnimationFrame(updateDots);
