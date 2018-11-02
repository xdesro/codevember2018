'use strict';
import '../styles/index.scss';

const NUMBER_OF_DOTS = 50; // Default is 50
const SIZE_LIMIT = 10 // Default is 10
const SPEED_LIMIT = 1 // Default is 1

class BernoulliDot {
    constructor(opts) {
        this.size = opts.size;
        this.theta = opts.theta || 1.2;
        this.directionForward = opts.directionForward;
        this.directionFn = getDirection(this.directionForward);
        this.velocity = opts.velocity || .08;
        this.center = opts.center;
        this.radius = opts.radius || 5;
        this.fillStyle = opts.fillStyle || 'black';
    }
    bernoulliFn(theta, size) {
        var scale = size / (Math.pow(Math.sin(theta), 2) + 1);
        var x = (scale * Math.cos(theta)) + this.center.x;
        var y = (scale * Math.sin(2 * theta) / 2) + this.center.y;
        return [x, y];
    }
    setDirection(direction) {
        this.directionForward = direction;
        this.directionFn = getDirection(this.directionForward);
    }
    update() {
        this.theta = this.directionFn(this.theta, this.velocity);
        return this;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.fillStyle;
        const xy = this.bernoulliFn(this.theta, this.size);
        drawDot(xy[0], xy[1], this.radius, ctx);
        ctx.fill();
        ctx.closePath();
    }
}
const getDirection = dir => {
    if (dir) {
        return function positive(t, vel) {
            return t += vel;
        };
    }
    return function negative(t, vel) {
        return t -= vel;
    };
};

const drawDot = (x, y, r, ctx) => {
    ctx.arc(x, y, r, 0, Math.PI * 2);
};

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.globalCompositeOperation = 'multiply';
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const size = canvas.width / 3;
const center = {
    x: width / 2,
    y: height / 2
};
const createRandomBernoulli = (thetaLimit, velocityLimit, radiusLimit, colors) => {
    let setColor;
    if (colors) {
        setColor = colors[Math.random() * colors.length()]
    } else {
        setColor = 'rgba(255, 255, 255, .8)'
    };
    return {
        theta: Math.random() * thetaLimit,
        directionForward: Math.random() >= 0.5,
        velocity: (Math.random() * velocityLimit) / 20,
        radius: (Math.random() * (radiusLimit - 2)) + 2,
        fillStyle: setColor
    };
};
const bernoulliDots = [];
for (let i = 0; i < NUMBER_OF_DOTS; i++) {
    bernoulliDots.push(new BernoulliDot({
        center: center,
        size,
        theta: 5.5,
        directionForward: false,
        fillStyle: 'rgba(255,255,255,.8)',
        velocity: .03,
        radius: 6,
        ...createRandomBernoulli(10, SPEED_LIMIT, SIZE_LIMIT),
    }))
}

const draw = () => {
    ctx.clearRect(0, 0, width, height);
    bernoulliDots.forEach(bernoulliDot => {
        bernoulliDot.update().draw(ctx);
    });
    requestAnimationFrame(draw);
};
requestAnimationFrame(draw);

window.onresize = () => {
    bernoulliDots.forEach(bernoulliDot => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, width, height);
        bernoulliDot.center.x = width / 2;
        bernoulliDot.center.y = height / 2;
    });
};