document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const treeImage = document.getElementById("treeImage");

  // Helper function to update the tree image
  function updateTreeImage() {
    if (!treeImage) return;
    const isDark = document.body.classList.contains("dark-mode");
    treeImage.src = isDark ? "TreeDark.png" : "Tree.png";
  }

  // Check if the user has a saved dark mode preference in localStorage
  const darkModeEnabled = localStorage.getItem("darkMode") === "true";
  if (darkModeEnabled) {
    darkModeToggle.checked = true;
    document.body.classList.add("dark-mode");
  }

  // Update the tree image on page load
  updateTreeImage();

  // Listen for changes on the toggle switch
  darkModeToggle.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
    updateTreeImage();
  });
});