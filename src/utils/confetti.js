/**
 * confetti.js - Lightweight vanilla JS confetti cannon for UX delight.
 * No deps, CSS-accelerated particles. Expanded with shapes, gravity, spread.
 * Usage: launchConfetti(element, options)
 * @version 3.0.0
 */
const launchConfetti = (
  target = document.body,
  { count = 150, colors = ["#f7931e", "#60a5fa", "#10b981", "#f87171", "#a78bfa"], spread = 60, gravity = 0.08 } = {}
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

  // Create particles - Expanded with random shapes (square/rect)
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 6 + 6,
      width: Math.random() * 8 + 4, // For rect
      height: Math.random() * 8 + 4, // For rect
      speedX: (Math.random() * spread - spread / 2) / 10,
      speedY: Math.random() * 3 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 12 - 6,
      shape: Math.random() > 0.5 ? "square" : "rect", // Expanded
    });
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      ctx.fillStyle = p.color;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      if (p.shape === "square") {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      } else {
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
      }
      ctx.restore();

      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;
      p.speedY += gravity; // Expanded gravity

      if (p.y > canvas.height + p.size) particles.splice(i, 1); // Remove fallen
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