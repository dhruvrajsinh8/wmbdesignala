const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 200;

// Utility function to generate random colors
function randomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

// Particle class to create each particle with unique properties
class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseX = x;
        this.baseY = y;
        this.color = color;
        this.speed = Math.random() * 0.02 + 0.01;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.y = this.baseY + Math.sin(this.x * 0.05 + Date.now() * this.speed) * 20;
        this.x += Math.cos(Date.now() * this.speed) * 0.5;

        // Loop particles horizontally
        if (this.x > canvas.width) {
            this.x = 0;
        }
        this.draw();
    }
}

// Initialize particles with random positions and colors
function init() {
    particlesArray.length = 0;
    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = randomColor();
        particlesArray.push(new Particle(x, y, size, color));
    }
}
init();

// Animate the particles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => particle.update());
    requestAnimationFrame(animate);
}
animate();

// Adjust canvas size on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});