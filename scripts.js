document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggleMain = document.getElementById("darkModeToggle");
  const darkModeToggleOffScreen = document.getElementById("darkModeToggleOffScreen");
  const treeImage = document.getElementById("treeImage");

  function updateTreeImage() {
    if (!treeImage) return;
    const isDark = document.body.classList.contains("dark-mode");
    treeImage.src = isDark ? "TreeDark.png" : "Tree.png";
  }

  function updateToggleIcons() {
    const icons = document.querySelectorAll('.toggle-icon');
    const isDark = document.body.classList.contains('dark-mode');
    icons.forEach(icon => {
      icon.textContent = isDark ? '🌙' : '☀️';
    });
  }

  function applyDarkModeState(isEnabled) {
    document.body.classList.toggle("dark-mode", isEnabled);
    localStorage.setItem("darkMode", isEnabled.toString());
    if (darkModeToggleMain) darkModeToggleMain.checked = isEnabled;
    if (darkModeToggleOffScreen) darkModeToggleOffScreen.checked = isEnabled;
    updateTreeImage();
    updateToggleIcons();
  }

  // Set initial state from local storage
  const storedPreference = localStorage.getItem("darkMode");
  const isDark = storedPreference === "true";
  applyDarkModeState(isDark);

  // Listen to both toggle switches
  [darkModeToggleMain, darkModeToggleOffScreen].forEach(toggle => {
    if (toggle) {
      toggle.addEventListener("change", function () {
        applyDarkModeState(this.checked);
      });
    }
  });

  // Hamburger menu behavior
  const hamMenu = document.querySelector(".ham-menu");
  const offScreenMenu = document.querySelector(".off-screen-menu");

  if (hamMenu && offScreenMenu) {
    hamMenu.addEventListener("click", () => {
      const isActive = offScreenMenu.classList.toggle("active");
      hamMenu.classList.toggle("active", isActive);
      document.body.classList.toggle("no-scroll", isActive);
    });

    const menuLinks = offScreenMenu.querySelectorAll("a");
    menuLinks.forEach(link =>
      link.addEventListener("click", () => {
        hamMenu.classList.remove("active");
        offScreenMenu.classList.remove("active");
        document.body.classList.remove("no-scroll");
      })
    );
  }
});
