// Select the button and overlay element
const rf_button = document.getElementById("feature_display");
const overlay = document.getElementById("image-overlay");

// Add event listener to button to toggle the overlay when clicked
rf_button.addEventListener("click", function() {
    // Toggle the visibility of the overlay
    overlay.style.display = overlay.style.display === "flex" ? "none" : "flex";
});