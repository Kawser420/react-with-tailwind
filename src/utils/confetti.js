/**
 * confetti.js - Lightweight vanilla JS confetti cannon for UX delight.
 * No deps, CSS-accelerated particles.
 * Usage: launchConfetti(element, options)
 */
const launchConfetti = (
  target = document.body,
  { count = 100, colors = ["#f7931e", "#60a5fa", "#10b981", "#f87171"] } = {}
) => {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  target.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const particles = [];

  // Create particles
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 5 + 5,
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 10 - 5,
    });
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      ctx.fillStyle = p.color;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();

      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;
      p.speedY += 0.05; // Gravity

      if (p.y > canvas.height) particles.splice(i, 1); // Remove fallen
    });

    if (particles.length > 0) requestAnimationFrame(animate);
    else target.removeChild(canvas);
  };

  animate();
};

// Export for global use
if (typeof window !== "undefined") {
  window.launchConfetti = launchConfetti;
}

export { launchConfetti };
