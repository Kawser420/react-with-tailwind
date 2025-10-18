/**
 * confetti.js - Enhanced lightweight vanilla JS confetti cannon for UX delight.
 * No deps, CSS-accelerated particles with wind/gravity simulation.
 * Usage: launchConfetti(element, options)
 * @version 2.0.0
 * @author ReactTailwind Pro Team
 */
const launchConfetti = (
  target = document.body,
  {
    count = 150,
    colors = ["#f7931e", "#60a5fa", "#10b981", "#f87171", "#a78bfa", "#ef4444"],
    spread = 360,
    startVelocity = 45,
    decay = 0.94,
    gravity = 1,
    wind = 0,
    ticks = 200,
    zIndex = 9999,
  } = {}
) => {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = zIndex.toString();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  target.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const particles = [];

  // Enhanced particle creation with randomization
  for (let i = 0; i < count; i++) {
    const angle = (i * spread) / count;
    const velocity = {
      x: Math.cos(angle) * (startVelocity * (Math.random() * 0.5 + 0.5)),
      y: Math.sin(angle) * (startVelocity * (Math.random() * 0.5 + 0.5)),
    };
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 6 + 3,
      speedX: velocity.x,
      speedY: velocity.y,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 20 - 10,
      life: ticks,
    });
  }

  let tick = 0;
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const remaining = particles.filter((p) => {
      p.x += (p.speedX + wind) * (tick / ticks);
      p.y += p.speedY * (tick / ticks);
      p.rotation += p.rotationSpeed;
      p.life -= 1;
      p.speedY += gravity * (tick / ticks);

      if (p.life > 0) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / ticks;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
        return true;
      }
      return false;
    }).length;

    tick++;
    if (remaining > 0) {
      requestAnimationFrame(animate);
    } else {
      target.removeChild(canvas);
    }
  };

  animate();

  // Cleanup on resize
  const resizeHandler = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resizeHandler);
  setTimeout(() => window.removeEventListener("resize", resizeHandler), 5000);
};

// Export for global use
if (typeof window !== "undefined") {
  window.launchConfetti = launchConfetti;
}

export { launchConfetti };