// Array of birthday messages
const birthdayMessages = [
  "Wishing you a day filled with joy, laughter, and all the things that make you happy. Happy Birthday! 🎂🎈",
  "May your birthday be as special as you are, and may the year ahead bring you endless happiness. Happy Birthday! 🎉💖",
  "Here’s to a day of celebrations and a year of achievements! Wishing you the best birthday ever! 🎂🎊",
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
  "Wishing you a day that’s as special as you are! Happy Birthday, and may all your wishes come true! 🎊🎈",
  "May your birthday be filled with all the things that bring you joy, and may the year ahead be your best one yet. 🎂🎉",
  "Here’s to a year of success, happiness, and all your dreams coming true! Happy Birthday! 🎉🎁",
];

// Function to suggest a random birthday message
function suggestRandomMessage() {
  const randomIndex = Math.floor(Math.random() * birthdayMessages.length);
  const randomMessage = birthdayMessages[randomIndex];
  const messageTextarea = document.getElementById("message");
  messageTextarea.value = randomMessage;
}

// Attach the event listener to the 'Suggest message 🎲' button
document
  .getElementById("suggestMessageBtn")
  .addEventListener("click", suggestRandomMessage);

// Function to handle form submission and generate the link
async function handleFormSubmission(event) {
  event.preventDefault();
  const formData = new FormData(this);

  // Show "Wait..." and disable the button
  showLoadingState();

  try {
    const response = await fetch(
      "https://birthday-gift-api.vercel.app/api/generate",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      const link = data.link;

      // Disable the Generate Link button and change its background color
      disableGenerateLinkButton();

      // Hide input section and Display the generated link
      displayGeneratedLink(link);
    } else {
      const errorMessage =
        (await response.text()) || "Failed to generate link. Please try again.";
      alert(errorMessage);
      resetGenerateLinkButton();
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while generating the link.");
    resetGenerateLinkButton();
  }
}

// Function to show the loading state on the button with a spinner
function showLoadingState() {
  const generateButton = document.querySelector("button[type=submit]");
  generateButton.disabled = true;
  generateButton.innerHTML = 'Wait <span class="spinner"></span>'; // Add spinner HTML
  generateButton.style.backgroundColor = "#f0ad4e"; // Optional: Change color to indicate waiting
  generateButton.style.cursor = "default";
}

// Function to disable the Generate Link button once the link is generated
function disableGenerateLinkButton() {
  const generateButton = document.querySelector("button[type=submit]");
  generateButton.disabled = true;
  generateButton.textContent = "Link Generated! 🎉";
  generateButton.style.background = "#5cb85c"; // Change button color
  generateButton.style.cursor = "default";
}

// Function to reset the Generate Link button if an error occurs
function resetGenerateLinkButton() {
  const generateButton = document.querySelector("button[type=submit]");
  generateButton.disabled = false;
  generateButton.textContent = "Generate Link 🚀";
  generateButton.style.backgroundColor = "#b8885a"; // Original button color
  generateButton.style.cursor = "pointer";
}

// Function to display the generated link
function displayGeneratedLink(link) {
  // Move to the middle of the page
  const formContainer = document.querySelector(".form-container");
  formContainer.style.marginTop = "8vh";

  // Hide the input section and display the generated link
  const inputSection = document.querySelector(".input-section");
  inputSection.style.display = "none";
  const linkContainer = document.getElementById("generatedLinkContainer");
  const linkInput = document.getElementById("generatedLink");
  linkContainer.style.display = "block";
  linkInput.value = link;

  // Display whatsapp share button
  document.getElementById("whatsapp").style.display = "inline-block";

  // Add event listeners for copy and visit buttons
  addCopyLinkListener(linkInput);
  addVisitLinkListener(linkInput);
  addWhatsAppShareListener(linkInput);
}

// Function to add copy-to-clipboard functionality
function addCopyLinkListener(linkInput) {
  const copyButton = document.getElementById("copyLinkButton");

  copyButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (!linkInput.value) {
      alert("Please generate a link first.");
      return;
    }

    // Copy the link to the clipboard
    linkInput.select();
    document.execCommand("copy");

    // Show copy animation on the button
    copyButton.classList.add("active");
    setTimeout(() => {
      copyButton.classList.remove("active");
    }, 1000);
  });
}

// Function to add visit link functionality
function addVisitLinkListener(linkInput) {
  document
    .getElementById("visitLinkButton")
    .addEventListener("click", function (event) {
      event.preventDefault();

      if (!linkInput.value) {
        alert("Please generate a link first.");
        return;
      }

      // Open the link in a new tab
      window.open(linkInput.value, "_blank");
    });
}

// Function to add WhatsApp share functionality
function addWhatsAppShareListener(linkInput) {
  document
    .getElementById("whatsapp")
    .addEventListener("click", function (event) {
      event.preventDefault();

      if (!linkInput.value) {
        alert("Please generate a link first.");
        return;
      }

      // Share directly to WhatsApp Web
      window.open(
        "https://api.whatsapp.com/send?text=" +
          encodeURIComponent(linkInput.value)
      );
    });
}

// Attach the form submission event listener
document
  .getElementById("birthdayForm")
  .addEventListener("submit", handleFormSubmission);
