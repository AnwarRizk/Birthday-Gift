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
  //   generateButton.style.height = "40px"; // Optional: Increase height to fit the spinner
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
