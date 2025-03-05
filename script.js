//your JS code here. If required.document.addEventListener("DOMContentLoaded", () => {
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("download-images-button");
  const outputDiv = document.getElementById("output");

  if (!button || !outputDiv) {
    console.error("Button or output div not found!");
    return;
  }

  button.addEventListener("click", function () {
    outputDiv.innerHTML = ""; // Clear existing images

    // Image URLs
    const imageUrls = [
      "https://picsum.photos/id/237/200/300",
      "https://picsum.photos/id/238/200/300",
      "https://picsum.photos/id/239/200/300",
    ];

    // Create promises for loading images
    const imagePromises = imageUrls.map((url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img); // Resolve when image loads
      });
    });

    // Wait for all images to load using Promise.all
    Promise.all(imagePromises)
      .then((images) => {
        images.forEach((img) => outputDiv.appendChild(img)); // Append images to output
      })
      .catch((error) => console.error("Image loading failed", error));
  });
});
