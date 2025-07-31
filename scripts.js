document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const treeImage      = document.getElementById("treeImage");

  function updateTreeImage() {
    if (!treeImage) return;
    const isDark = document.body.classList.contains("dark-mode");
    treeImage.src = isDark ? "TreeDark.png" : "Tree.png";
  }

  if (darkModeToggle) {
    const darkModeEnabled = localStorage.getItem("darkMode") === "true";
    if (darkModeEnabled) {
      darkModeToggle.checked = true;
      document.body.classList.add("dark-mode");
    }

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
  }

  const hamMenu       = document.querySelector(".ham-menu");
  const offScreenMenu = document.querySelector(".off-screen-menu");

  if (hamMenu && offScreenMenu) {
    // Toggle on hamburger click
    hamMenu.addEventListener("click", () => {
      hamMenu.classList.toggle("active");
      offScreenMenu.classList.toggle("active");
    });

    // *** NEW: close when any menu link is clicked ***
    const menuLinks = offScreenMenu.querySelectorAll("a"); 
    menuLinks.forEach(link =>
      link.addEventListener("click", () => {a
        hamMenu.classList.remove("active");
        offScreenMenu.classList.remove("active");
      })
    );
  }
});
