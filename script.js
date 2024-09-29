window.onload = async function () {
  // Extract the ID from the URL path (e.g., /birthday.html?id=123)
  const urlParams = new URLSearchParams(window.location.search);

  // Get the ID from the URL
  const id = urlParams.get("id");

  //   id = "a2d7bec8-fd04-419a-b5b6-c99635c787c1";

  console.log(id);

  // Check if the ID is valid
  if (!id || id === "undefined") {
    document.body.innerHTML = "<h2>Invalid birthday details!</h2>";
    return;
  }

  try {
    const response = await fetch(
      `https://birthday-gift-api.vercel.app/api/birthday/${id}`
    );

    // Ensure response is ok
    if (!response.ok) {
      throw new Error("Birthday details not found!");
    }

    const data = await response.json();
    const { friendName, senderName, message, imageUrl } = data.data;

    const happyBirthday = `Happy Birthday, ${friendName}  🎊🎉`;

    document.getElementById("happyBirthday").textContent = happyBirthday;
    document.getElementById("birthdayMessage").textContent = message;
    document.querySelector(".sender").textContent = senderName;

    // Handle missing image URL gracefully
    document.getElementById("birthdayImage").src =
      imageUrl || "/images/default-image.gif";
  } catch (err) {
    console.error(err);
    document.body.innerHTML = "<h2>Birthday details not found! 💥</h2>";
  }
};
