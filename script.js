window.onload = async function () {
  await fetchBirthdayDetails();
  initFireworks();
  createGlowParticles();
  createSparkles();
};

async function fetchBirthdayDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id") || "145ed25c-4e1e-44da-b24a-ca5b8a36dcbb";

  if (!id || id === "undefined") {
    displayError("Invalid birthday details!");
    return;
  }

  try {
    const response = await fetch(`https://birthday-gift-api.vercel.app/api/birthday/${id}`);

    if (!response.ok) throw new Error("Birthday details not found!");

    const data = await response.json();
    displayBirthdayDetails(data.data);
  } catch (err) {
    console.error(err);
    displayError("Birthday details not found! 💥");
  }
}

function displayBirthdayDetails({ friendName, senderName, message, imageUrl }) {
  document.getElementById("happyBirthday").textContent = `Happy Birthday, ${friendName}`;
  document.getElementById("birthdayMessage").textContent = message;
  document.querySelector(".sender").textContent = senderName;

  if (imageUrl && imageUrl.includes("upload/")) {
    const updatedImageUrl = imageUrl.replace("/upload/", "/upload/f_auto/q_auto/");
    document.getElementById("birthdayImage").src = updatedImageUrl;
  } else {
    document.getElementById("birthdayImage").src = "/images/default-image.svg";
  }
}

function displayError(message) {
  document.body.innerHTML = `
    <div class="error-container">
      <h2>${message}</h2>
      <p>Something went wrong. Please check the link and try again.</p>
    </div>
  `;
}

function createGlowParticles() {
  const container = document.getElementById("glowParticles");
  const colors = ["#ff6b95", "#845ec2", "#ffc75f", "#25d366"];

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "glow-particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;
    particle.style.animationDuration = (Math.random() * 5 + 5) + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";
    container.appendChild(particle);
  }
}

function createSparkles() {
  const container = document.getElementById("sparkles");

  for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.animationDuration = (Math.random() * 2 + 1) + "s";
    sparkle.style.animationDelay = Math.random() * 3 + "s";
    container.appendChild(sparkle);
  }
}

function initFireworks() {
  const canvas = document.getElementById("fireworksCanvas");
  const ctx = canvas.getContext("2d");

  let fireworks = [];
  let particles = [];

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function createFirework() {
    let x = randomRange(0, canvas.width);
    let y = randomRange(0, canvas.height / 2);
    fireworks.push({
      x: x,
      y: y,
      radius: 0,
      maxRadius: randomRange(40, 80),
      speed: randomRange(1.5, 3),
      color: `hsl(${randomRange(0, 360)}, 100%, 60%)`,
    });
  }

  function explode(firework) {
    let numParticles = randomRange(25, 60);
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: firework.x,
        y: firework.y,
        radius: randomRange(2, 5),
        speedX: randomRange(-6, 6),
        speedY: randomRange(-6, 6),
        color: firework.color,
        gravity: 0.05,
        friction: 0.97,
        alpha: 1,
      });
    }
  }

  function updateFireworks() {
    fireworks.forEach((firework, index) => {
      firework.radius += firework.speed;
      if (firework.radius >= firework.maxRadius) {
        explode(firework);
        fireworks.splice(index, 1);
      }
    });

    particles.forEach((particle, index) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.speedY += particle.gravity;
      particle.speedX *= particle.friction;
      particle.speedY *= particle.friction;
      particle.alpha -= 0.015;
      particle.radius *= 0.98;
      
      if (particle.alpha <= 0 || particle.radius <= 0) {
        particles.splice(index, 1);
      }
    });
  }

  function drawFireworks() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework) => {
      ctx.beginPath();
      ctx.arc(firework.x, firework.y, firework.radius, 0, Math.PI * 2);
      ctx.fillStyle = firework.color;
      ctx.shadowBlur = 20;
      ctx.shadowColor = firework.color;
      ctx.fill();
      ctx.closePath();
      ctx.shadowBlur = 0;
    });

    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.alpha;
      ctx.shadowBlur = 10;
      ctx.shadowColor = particle.color;
      ctx.fill();
      ctx.closePath();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    });
  }

  function animate() {
    updateFireworks();
    drawFireworks();
    requestAnimationFrame(animate);
  }

  setInterval(createFirework, 800);
  animate();

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }
}