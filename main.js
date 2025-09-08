gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.

const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for reduced motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

function showProjects(category) {
  // Get all project links wrapping pro-cards
  var projects = document.querySelectorAll(".project-link");

  projects.forEach(function (project) {
    var proCard = project.querySelector(".pro-card");
    if (
      category === "All" ||
      proCard.getAttribute("data-category") === category
    ) {
      project.style.display = "inline-block"; // or "block" based on styling
      proCard.classList.add("active");
    } else {
      project.style.display = "none";
      proCard.classList.remove("active");
    }
  });

  var togglerButtons = document.querySelectorAll(".right h4");
  togglerButtons.forEach(function (button) {
    button.classList.remove("active");
    if (button.innerText === category) {
      button.classList.add("active");
    }
  });
}

// Select the loading page container
const loadingPage = document.querySelector(".loading-page");

// Function to prevent scrolling
function preventScroll(event) {
  event.preventDefault();
}

// Add event listeners to prevent scrolling
loadingPage.addEventListener("wheel", preventScroll, { passive: false });
loadingPage.addEventListener("touchmove", preventScroll, { passive: false });

// Additional event listener for keyboard scrolling on laptops
window.addEventListener("keydown", function (event) {
  // Prevent default behavior if any arrow key is pressed
  if (event.key.includes("Arrow")) {
    preventScroll(event);
  }
});

var tl = gsap.timeline({
  onComplete: function () {
    // Remove the loading page from the DOM
    var loadingPage = document.querySelector(".loading-page");
    loadingPage.remove();
    ScrollTrigger.refresh();
  },
});
tl.fromTo(
  ".logo-name",
  {
    y: 50,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 2,
    delay: 0.5,
  }
);
tl.fromTo(
  ".loading-page",
  { opacity: 1 },
  {
    opacity: 0,
    display: "none",
    duration: 1.5,
    delay: 1.5,
  }
);

tl.from(".card-right h1, .card-right span", {
  x: 100,
  opacity: 0,
  duration: 0.4,
  stagger: 0.2,
});
tl.from(".img-container", {
  y: 60,
  opacity: 0,
  scale: 0.85,
  duration: 1.1,
  ease: "power2.out",
  delay: 0.1,
}).from(
  ".card-left h3, .card-left a",
  {
    y: 100,
    opacity: 0,
    duration: 0.4,
    stagger: 0.13,
    ease: "power2.out",
  },
  "-=0.2"
);

tl.from("#title, #sub-title", {
  y: 100,
  opacity: 0,
  duration: 0.5,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".exp-container ",
    scroller: "#main",
    start: "top 80%",
    end: "top 10%",
    scrub: 1,
  },
});
tl.from(".page-2 .title, .page-2 .sub-title ", {
  opacity: 0,
  y: 100,
  duration: 0.5,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".page-1 ",
    scroller: "#main",
    start: "top 40%",
    end: "top 20%",
    scrub: 1,
  },
});

// tl.from(".text-container .text", {
//   x: -100,
//   opacity: 0,
//   stagger: 0.2,
//   duration: 0.5,
//   scrollTrigger: {
//     trigger: ".page-2 ",
//     scroller: "#main",
//     start: "top 40%",
//     end: "top 20%",
//     scrub: 1,
//   },
// });

// tl.from(".img-container", {
//   opacity: 0,
//   duration: 0.5,
//   scrollTrigger: {
//     trigger: ".page-2 ",
//     scroller: "#main",
//     start: "top 40%",
//     end: "top 0%",
//     scrub: 1,
//   },
// });

tl.from(".exp-card", {
  opacity: 0,
  duration: 1.5,
  stagger: 1.2,
  scrollTrigger: {
    trigger: ".page-2",
    scroller: "#main",
    start: "top 30%",
    end: "top 0%",
    scrub: 1,
  },
});
tl.from(".p3-container .title, .p3-container .sub-title", {
  y: 100,
  opacity: 0,
  stagger: 0.2,
  duration: 0.5,
  scrollTrigger: {
    trigger: ".toggler-container",
    scroller: "#main",
    start: "top 80%",
    end: "top 20%",
    scrub: 1,
  },
});
tl.from(".toggler-container .right h4", {
  opacity: 0,
  duration: 0.5,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".toggler-container ",
    scroller: "#main",
    start: "top 60%",
    end: "top 20%",
    scrub: 1,
  },
});
tl.from(".projects-cards .pro-card", {
  opacity: 0,
  duration: 1.5,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".toggler-container  ",
    scroller: "#main",
    start: "top 60%",
    end: "top 30%",
    scrub: 1,
  },
});
tl.from(".page-4 .title, .page-4 .sub-title ", {
  opacity: 0,
  y: 100,
  duration: 0.5,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".page-4 ",
    scroller: "#main",
    start: "top 40%",
    end: "top 20%",
    scrub: 1,
  },
});
tl.from("form input.name, form textarea ", {
  opacity: 0,
  duration: 0.5,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".page-4 ",
    scroller: "#main",
    start: "top 40%",
    end: "top 20%",
    scrub: 1,
  },
});
tl.from("form input.mail , .btn", {
  opacity: 0,
  duration: 0.5,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".page-4 ",
    scroller: "#main",
    start: "top 40%",
    end: "top 20%",
    scrub: 1,
  },
});
