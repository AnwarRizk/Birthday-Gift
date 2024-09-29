// Load the birthday details and initialize the fireworks animation when the window loads
window.onload = async function () {
  // Fetch and display birthday details
  await fetchBirthdayDetails();

  // Initialize fireworks animation
  initFireworks();
};

// Fetch Birthday Details
async function fetchBirthdayDetails() {
  // Extract the ID from the URL or use a fallback ID
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id") || "a2d7bec8-fd04-419a-b5b6-c99635c787c1";

  if (!id || id === "undefined") {
    displayError("Invalid birthday details!");
    return;
  }

  try {
    const response = await fetch(
      `https://birthday-gift-api.vercel.app/api/birthday/${id}`
    );

    // Ensure the response is valid
    if (!response.ok) throw new Error("Birthday details not found!");

    const data = await response.json();
    displayBirthdayDetails(data.data);
  } catch (err) {
    console.error(err);
    displayError("Birthday details not found! 💥");
  }
}

// Display Birthday Details on the Page
function displayBirthdayDetails({ friendName, senderName, message, imageUrl }) {
  document.getElementById(
    "happyBirthday"
  ).textContent = `Happy Birthday, ${friendName}`;
  document.getElementById("birthdayMessage").textContent = message;
  document.querySelector(".sender").textContent = senderName;

  // Set default image if imageUrl is not provided
  document.getElementById("birthdayImage").src =
    imageUrl || "/images/default-image.gif";
}

// Display Error Message
function displayError(message) {
  document.body.innerHTML = `<h2>${message}</h2>`;
}

// Initialize Fireworks Animation
function initFireworks() {
  const canvas = document.getElementById("fireworksCanvas");
  const ctx = canvas.getContext("2d");

  let fireworks = [];
  let particles = [];

  // Resize the canvas to fill the browser window
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas(); // Initial resize

  // Function to create a firework explosion
  function createFirework() {
    let x = randomRange(0, canvas.width);
    let y = randomRange(0, canvas.height / 2);
    fireworks.push({
      x: x,
      y: y,
      radius: 0,
      maxRadius: randomRange(50, 100),
      speed: randomRange(1, 3),
      color: `hsl(${randomRange(0, 360)}, 100%, 50%)`,
    });
  }

  // Function to explode the firework into particles
  function explode(firework) {
    let numParticles = randomRange(20, 50);
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: firework.x,
        y: firework.y,
        radius: randomRange(2, 4),
        speedX: randomRange(-5, 5),
        speedY: randomRange(-5, 5),
        color: firework.color,
      });
    }
  }

  // Update Fireworks and Particles
  function updateFireworks() {
    fireworks.forEach((firework, index) => {
      firework.radius += firework.speed;
      if (firework.radius >= firework.maxRadius) {
        explode(firework);
        fireworks.splice(index, 1); // Remove the exploded firework
      }
    });

    particles.forEach((particle, index) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.radius -= 0.05; // Shrink particles over time
      if (particle.radius <= 0) {
        particles.splice(index, 1); // Remove faded particles
      }
    });
  }

  // Draw Fireworks and Particles on the Canvas
  function drawFireworks() {
    fireworks.forEach((firework) => {
      ctx.beginPath();
      ctx.arc(firework.x, firework.y, firework.radius, 0, Math.PI * 2);
      ctx.fillStyle = firework.color;
      ctx.fill();
      ctx.closePath();
    });

    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      ctx.closePath();
    });
  }

  // Main Animation Loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    updateFireworks(); // Update positions and states
    drawFireworks(); // Draw updated fireworks and particles
    requestAnimationFrame(animate); // Loop the animation
  }

  // Start fireworks creation at intervals
  setInterval(createFirework, 1000); // Create a new firework every second
  animate(); // Start the animation loop

  // Helper Functions

  // Resize the canvas to fit the screen
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Generate a random number between a min and max value
  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }
}
