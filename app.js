window.onload = function () {
  particlesJS("particles-js", {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: "#02E1F0" }, // Visible Cyan
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 2 },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#02E1F0",
        opacity: 0.4,
        width: 1,
      }, // Cyan Lines
      move: { enable: true, speed: 2 },
    },
    interactivity: {
      detect_on: "window",
      events: { onhover: { enable: true, mode: "repulse" } },
      modes: { repulse: { distance: 100 } },
    },
    "page background (css)": {
      "background-color": "#111616",
    },
    retina_detect: true,
  });
};
