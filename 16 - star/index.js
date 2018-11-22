const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let windowWidth, windowHeight, euclid, canvasWidth, canvasHeight, center = {};

const getSizes = () => {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  euclid = windowWidth >= windowHeight ? windowHeight : windowWidth;
  canvasWidth = canvas.width = euclid / 2;
  canvasHeight = canvas.height = euclid / 2;
  center = {
    x: canvasWidth / 2,
    y: canvasHeight / 2
  }
}
getSizes();

const Scene = [];
const radius = canvasWidth / 2;
const baseCount = 50;
let iterations = {
  x: Array(baseCount),
  y: Array(baseCount)
};
ctx.strokeStyle = '#fff';
ctx.globalAlpha = .5;
const handleMouseMove = e => {
  const mouse = {
    x: e.layerX,
    y: e.layerY
  };
  if (Math.sqrt(
      (mouse.x - center.x) * (mouse.x - center.x) +
      (mouse.y - center.y) * (mouse.y - center.y)
    ) <= radius) {
    const xIterations = Math.abs(((mouse.x - center.x) / (center.x + radius) * 2))
    const yIterations = Math.abs(((mouse.y - center.y) / (center.y + radius) * 2))
    iterations.x = Array(Math.ceil(baseCount * xIterations) + 4);
    iterations.y = Array(Math.ceil(baseCount * yIterations) + 4);
  }
}
const draw = () => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  for (let i = 0; i < iterations.x.length; i++) {
    ctx.beginPath();
    ctx.ellipse(center.x, center.y, radius - (radius / iterations.x.length) * i, radius, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }
  for (let i = 0; i < iterations.y.length; i++) {
    ctx.beginPath();
    ctx.ellipse(center.x, center.y, radius - (radius / iterations.y.length) * i, radius, Math.PI / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }

  ctx.beginPath();
  ctx.moveTo(center.x, center.y - radius);
  ctx.lineTo(center.x, center.y + radius);
  ctx.stroke();
  ctx.closePath;

  ctx.beginPath();
  ctx.moveTo(center.x - radius, center.y);
  ctx.lineTo(center.x + radius, center.y);
  ctx.stroke();
  ctx.closePath;

  requestAnimationFrame(draw);
}
draw();

canvas.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', getSizes);
