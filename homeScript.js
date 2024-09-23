// Function to handle form submission and generate the link
async function handleFormSubmission(event) {
  event.preventDefault();
  const formData = new FormData(this);

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

      // Display the generated link
      displayGeneratedLink(link);
    } else {
      alert("Failed to generate link. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while generating the link.");
  }
}

// Function to disable the Generate Link button
function disableGenerateLinkButton() {
  document.querySelector("button[type=submit]").disabled = true;
  document.querySelector("button[type=submit]").textContent =
    "Link Generated! 🎉";
  document.querySelector("button[type=submit]").style.backgroundColor =
    "#4CAF50";
  document.querySelector("button[type=submit]").style.cursor = "default";
}

// Function to display the generated link
function displayGeneratedLink(link) {
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
