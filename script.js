//your JS code here. If required.document.addEventListener("DOMContentLoaded", () => {
   const imageUrls = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/id/238/200/300",
  "https://picsum.photos/id/239/200/300"
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

// Function to download multiple images in parallel
function downloadImages() {
  const outputDiv = document.getElementById("output");
  
  // Clear previous content
  outputDiv.innerHTML = '<p id="loading">Loading...</p>';

  Promise.all(imageUrls.map(downloadImage))
    .then(images => {
      document.getElementById("loading").remove(); // Remove loading message

      images.forEach(img => outputDiv.appendChild(img));
    })
    .catch(error => {
      document.getElementById("loading").remove(); // Remove loading message
      outputDiv.innerHTML = `<p style="color: red">${error}</p>`; // Show error message
    });
}

// Run the function to automatically download images when the page loads
document.addEventListener("DOMContentLoaded", downloadImages);
