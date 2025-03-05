//your JS code here. If required.document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");
    const loading = document.createElement("div");
    loading.id = "loading";
    loading.innerText = "Loading...";
    loading.style.display = "none";
    document.body.appendChild(loading); // Append loading spinner to body

    const errorDiv = document.createElement("div");
    errorDiv.id = "error";
    errorDiv.style.color = "red";
    document.body.appendChild(errorDiv); // Append error message div to body

    const btn = document.createElement("button");
    btn.id = "download-images-button";
    btn.innerText = "Download Images";
    document.body.insertBefore(btn, output); // Insert button before output div

    const images = [
        { url: "https://picsum.photos/id/237/200/300" },
        { url: "https://picsum.photos/id/238/200/300" },
        { url: "https://picsum.photos/id/239/200/300" },
        { url: "https://invalid-url.xyz/200/300" }, // Invalid URL to test error handling
    ];

    // Function to download a single image
    const downloadImage = (image) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image.url;

            img.onload = () => resolve(img); // Resolve promise if image loads successfully
            img.onerror = () => reject(`Failed to load image: ${image.url}`); // Reject if loading fails
        });
    };

    // Function to handle downloading all images
    const downloadImages = () => {
        output.innerHTML = ""; // Clear previous images
        errorDiv.innerHTML = ""; // Clear previous errors
        loading.style.display = "block"; // Show loading spinner

        // Download all images in parallel using Promise.all
        Promise.all(images.map(downloadImage))
            .then((loadedImages) => {
                loading.style.display = "none"; // Hide loading spinner
                loadedImages.forEach((img) => output.appendChild(img)); // Append images to output div
            })
            .catch((error) => {
                loading.style.display = "none"; // Hide loading spinner
                errorDiv.innerText = error; // Display error message
            });
    };

    btn.addEventListener("click", downloadImages); // Attach click event to button
});
