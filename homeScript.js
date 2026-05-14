const birthdayMessages = [
  "Wishing you a day filled with joy, laughter, and all the things that make you happy. Happy Birthday! 🎂🎈",
  "May your birthday be as special as you are, and may the year ahead bring you endless happiness. Happy Birthday! 🎉💖",
  "Here's to a day of celebrations and a year of achievements! Wishing you the best birthday ever! 🎂🎊",
  "Happy Birthday! 🎈 May your day be filled with love, laughter, and wonderful moments to cherish.",
  "Sending you loads of love and good wishes on your special day. Have a fantastic year ahead! 🎉🎂",
  "Wishing you a birthday filled with all your heart's desires and a year full of endless success and joy! 🎁🎊",
  "Happy Birthday! 🎈 May your dreams come true, and your year be filled with laughter and success.",
  "On your special day, I wish you happiness, success, and a day full of memorable moments. Have a fantastic birthday! 🎂🎉",
  "May your birthday be the beginning of a year filled with happiness, good health, and great achievements. Happy Birthday! 🎊🎈",
  "Wishing you a year filled with everything that makes you smile. Happy Birthday to a truly special person! 🎂🎉",
  "May your birthday bring you everything you wish for and more! Have a magical day full of joy and love. 🎈🎉",
  "Wishing you a day as amazing as you are and a year filled with happiness, success, and all the good things. Happy Birthday! 🎊🎁",
  "Happy Birthday! 🎂 May the coming year be as incredible and joyful as you are. Celebrate to the fullest!",
  "Wishing you all the happiness and success in the world today and always. Happy Birthday! 🎉🎈",
  "May this year be filled with countless blessings and may all your dreams come true. Happy Birthday! 🎂🎊",
  "I wish you a year full of joy, happiness, and success. May all your wishes come true. Happy Birthday! 🎉",
  "On your birthday, I wish you endless joy and a year full of exciting new possibilities! 🎉🎂",
  "Wishing you a day that's as special as you are! Happy Birthday, and may all your wishes come true! 🎊🎈",
  "May your birthday be filled with all the things that bring you joy, and may the year ahead be your best one yet. 🎂🎉",
  "Here's to a year of success, happiness, and all your dreams coming true! Happy Birthday! 🎉🎁",
];

function suggestRandomMessage() {
  const randomIndex = Math.floor(Math.random() * birthdayMessages.length);
  const randomMessage = birthdayMessages[randomIndex];
  const messageTextarea = document.getElementById("message");
  messageTextarea.value = randomMessage;
  messageTextarea.style.borderColor = '#ffc75f';
  setTimeout(() => {
    messageTextarea.style.borderColor = 'rgba(255, 255, 255, 0.2)';
  }, 1000);
}

document.getElementById("suggestMessageBtn").addEventListener("click", suggestRandomMessage);

async function handleFormSubmission(event) {
  event.preventDefault();
  const formData = new FormData(this);
  showLoadingState();

  try {
    const response = await fetch("https://birthday-gift-api.vercel.app/api/generate", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      const link = data.link;
      disableGenerateLinkButton();
      displayGeneratedLink(link);
    } else {
      const errorMessage = (await response.text()) || "Failed to generate link. Please try again.";
      alert(errorMessage);
      resetGenerateLinkButton();
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while generating the link.");
    resetGenerateLinkButton();
  }
}

function showLoadingState() {
  const generateButton = document.getElementById("generateBtn");
  generateButton.disabled = true;
  generateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
}

function disableGenerateLinkButton() {
  const generateButton = document.getElementById("generateBtn");
  generateButton.disabled = true;
  generateButton.innerHTML = '<i class="fas fa-check"></i> Link Generated!';
  generateButton.style.background = 'linear-gradient(135deg, #25d366, #128c7e)';
}

function resetGenerateLinkButton() {
  const generateButton = document.getElementById("generateBtn");
  generateButton.disabled = false;
  generateButton.innerHTML = '<i class="fas fa-rocket"></i> Generate Magic Link';
  generateButton.style.background = '';
}

function displayGeneratedLink(link) {
  const inputSection = document.querySelector(".input-section");
  inputSection.style.display = "none";
  
  const generateBtn = document.getElementById("generateBtn");
  generateBtn.style.display = "none";
  
  const linkContainer = document.getElementById("generatedLinkContainer");
  const linkInput = document.getElementById("generatedLink");
  linkContainer.style.display = "block";
  linkInput.value = link;

  addCopyLinkListener(linkInput);
  addVisitLinkListener(linkInput);
  addWhatsAppShareListener(linkInput);
}

function addCopyLinkListener(linkInput) {
  const copyButton = document.getElementById("copyLinkButton");

  copyButton.addEventListener("click", function(event) {
    event.preventDefault();

    if (!linkInput.value) {
      alert("Please generate a link first.");
      return;
    }

    linkInput.select();
    document.execCommand("copy");

    copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
      copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy Link';
    }, 2000);
  });
}

function addVisitLinkListener(linkInput) {
  document.getElementById("visitLinkButton").addEventListener("click", function(event) {
    event.preventDefault();

    if (!linkInput.value) {
      alert("Please generate a link first.");
      return;
    }

    window.open(linkInput.value, "_blank");
  });
}

function addWhatsAppShareListener(linkInput) {
  document.getElementById("whatsappShare").addEventListener("click", function(event) {
    event.preventDefault();

    if (!linkInput.value) {
      alert("Please generate a link first.");
      return;
    }

    const shareText = encodeURIComponent("Check out this special birthday message! 🎁🎂\n" + linkInput.value);
    window.open("https://api.whatsapp.com/send?text=" + shareText);
  });
}

document.getElementById("birthdayForm").addEventListener("submit", handleFormSubmission);