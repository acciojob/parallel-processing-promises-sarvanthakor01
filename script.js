//your JS code here. If required.document.addEventListener("DOMContentLoaded", () => {
  const outputDiv = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");
const button = document.getElementById("download-images-button");

const imageUrls = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/id/238/200/300",
  "https://picsum.photos/id/239/200/300",
];

// Function to download an image and return a Promise
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

// Main function to download images in parallel
function downloadImages() {
  // Clear previous content
  outputDiv.innerHTML = "";
  errorDiv.innerHTML = "";
  loadingDiv.style.display = "block"; // Show loading spinner

  const downloadPromises = imageUrls.map((url) => downloadImage(url));

  Promise.all(downloadPromises)
    .then((images) => {
      loadingDiv.style.display = "none"; // Hide loading spinner
      images.forEach((img) => outputDiv.appendChild(img)); // Append images to output
    })
    .catch((error) => {
      loadingDiv.style.display = "none"; // Hide loading spinner
      errorDiv.textContent = error; // Display error message
    });
}

// Attach event listener to button
button.addEventListener("click", downloadImages);
