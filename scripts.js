document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggleMain = document.getElementById("darkModeToggle");
  const darkModeToggleOffScreen = document.getElementById("darkModeToggleOffScreen");
  const treeImage = document.getElementById("treeImage");

  const TREE_LIGHT = "assets/img/Tree.png";
  const TREE_DARK = "assets/img/TreeDark.png";

  function updateTreeImage() {
    if (!treeImage) return;
    const isDark = document.body.classList.contains("dark-mode");
    treeImage.src = isDark ? TREE_DARK : TREE_LIGHT;
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

  const hexCanvas = document.getElementById("hexBackground");
  if (hexCanvas instanceof HTMLCanvasElement) {
    const ctx = hexCanvas.getContext("2d");
    if (ctx) {
      const hexRadius = 60;
      const hexWidth = hexRadius * 2;
      const hexHeight = (Math.sqrt(3) / 2) * hexRadius;
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let animationFrameId;

      const updateCanvasSize = () => {
        hexCanvas.width = window.innerWidth;
        hexCanvas.height = window.innerHeight;
      };

      const drawHexagon = (cx, cy) => {
        ctx.beginPath();
        const increment = (Math.PI * 2) / 6;
        for (let angle = 0; angle <= Math.PI * 2; angle += increment) {
          const x = cx + Math.cos(angle) * hexRadius;
          const y = cy + Math.sin(angle) * hexRadius;
          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
      };

      const renderHexGrid = () => {
        ctx.clearRect(0, 0, hexCanvas.width, hexCanvas.height);
        ctx.lineWidth = 1;

        for (let x = -hexRadius; x < hexCanvas.width + hexRadius; x += hexWidth * 1.5) {
          let isEvenRow = true;
          for (let y = -hexRadius; y < hexCanvas.height + hexRadius; y += hexHeight) {
            const offset = isEvenRow ? (hexWidth * 1.5) / 2 : 0;
            const hx = x + offset;
            const dx = mouseX - hx;
            const dy = mouseY - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const alpha = (255 - Math.min(distance, 255)) / 255;
            const hueBase = (x / 5 + y / 7) % 360;
            const hue = (hueBase + 360) % 360;

            ctx.strokeStyle = `hsl(${hue}, 70%, 50%)`;
            ctx.globalAlpha = alpha;
            drawHexagon(hx, y);
            ctx.stroke();

            isEvenRow = !isEvenRow;
          }
        }

        ctx.globalAlpha = 1;
        animationFrameId = window.requestAnimationFrame(renderHexGrid);
      };

      window.addEventListener("mousemove", event => {
        mouseX = event.clientX;
        mouseY = event.clientY;
      });

      window.addEventListener("resize", updateCanvasSize);
      updateCanvasSize();
      renderHexGrid();

      window.addEventListener("beforeunload", () => {
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId);
        }
      });
    }
  }
});
