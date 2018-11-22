const Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

const engine = Engine.create();

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const constraintsOpts = {
  isStatic: true,
  render: {
    fillStyle: '#05151c'
  }
}
const constraints = [
  Bodies.rectangle(windowWidth / 2, windowHeight, windowWidth, 10, { ...constraintsOpts}),
  Bodies.rectangle(0, windowHeight / 2, 10, windowHeight, { ...constraintsOpts}),
  Bodies.rectangle(windowWidth, windowHeight / 2, 10, windowHeight, { ...constraintsOpts}),
  Bodies.rectangle(windowWidth / 2, 0, windowWidth, 10, { ...constraintsOpts})
]
// const render = Render.create({
//   element: document.body,
//   engine,
//   options: {
//     background: 'transparent',
//     wireframes: false,
//     showDebug: true,
//   }
// });
// render.canvas.width = document.documentElement.clientWidth;
// render.canvas.height = document.documentElement.clientHeight;
// render.canvas.onclick = e => {
//   const pathName = 'sprites/tile00' + Math.floor(Math.random() * 8) + '.png';
//   const randomRect = Bodies.rectangle(e.clientX, e.clientY, 40, 40, -100, {
//     render: {
//       fillStyle: 'transparent',
//       sprite: {
//         texture: pathName
//       }
//     }
//   });
//   World.add(engine.world, randomRect);
//   Matter.Body.applyForce(randomRect, {
//     x: randomRect.position.x,
//     y: randomRect.position.y
//   }, {
//       x: Math.random() * (Math.random() < 0.5 ? -.1 : .1),
//       y: Math.random() * -0.1
//     })
// };
const torch = Bodies.circle(windowWidth / 2, windowHeight / 2, 80, {isStatic: true});
const flame = Bodies.circle(windowWidth / 2, windowHeight / 2, 80, {isStatic: true});
World.add(engine.world, [flame, torch]);
// render.canvas.addEventListener('mousemove', e => {
//   Matter.Body.setPosition(torch, {
//     x: e.clientX,
//     y: e.clientY
//   });
//   Matter.Body.setPosition(flame, {
//     x: e.clientX,
//     y: e.clientY
//   })
// });

let currentSprite = 0;
const animate = () => {
  // if (currentSprite <= 8) {
  //   currentSprite+=1;
  //   torch.render.sprite.texture = `sprites/tile00${currentSprite}.png`;
  // } else {
  //   currentSprite = 0;
  // }
  
  requestAnimationFrame(animate);
}
animate();
World.add(engine.world, [...constraints]);

Engine.run(engine);




// Render.run(render);

// =====================

var app = new PIXI.Application();
document.body.appendChild(app.view);

let sheet = PIXI.loader.resources["sprites/torch.json"].frames;
animatedSprite = new PIXI.extras.AnimatedSprite(sheet.animations["image_sequence"]);

function onAssetsLoaded() {
  // create an array of textures from an image path
  var frames = [];

  for (var i = 0; i < 30; i++) {
    var val = i < 10 ? '0' + i : i;

    // magically works since the spritesheet was loaded with the pixi loader
    frames.push(PIXI.Texture.fromFrame(`sprites/tile0${val}.png`));
  }

  // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
  var anim = new PIXI.extras.AnimatedSprite(frames);

  /*
   * An AnimatedSprite inherits all the properties of a PIXI sprite
   * so you can change its position, its anchor, mask it, etc
   */
  anim.x = app.screen.width / 2;
  anim.y = app.screen.height / 2;
  anim.anchor.set(0.5);
  anim.animationSpeed = 0.5;
  anim.play();

  app.stage.addChild(anim);

  // Animate the rotation
  app.ticker.add(function () {
    // anim.rotation += 0.01;
  });
}
