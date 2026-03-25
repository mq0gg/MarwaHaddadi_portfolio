const hero = document.getElementById("hero");
const tabs = document.getElementById("tabs");
const indicator = document.getElementById("navIndicator");
const links = document.querySelectorAll(".tab-link");
const sections = document.querySelectorAll("main section");

/* ===== Moving the bubble===== */
function moveIndicator(activeLink) {
  const tabsRect = tabs.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();

  const isFirst = activeLink.dataset.target === "objective";
  let extraWidth = 18;

  let left = linkRect.left - tabsRect.left - (extraWidth / 2);

  // If it's the first button make it touch the beginning of the bar.
  if (isFirst) {
    left = 0;
  }

  const width = linkRect.width + extraWidth;

  indicator.style.left = `${left}px`;
  indicator.style.width = `${width}px`;
}

/* ===== Setting the active link ===== */
function setActiveLink(targetId) {
  links.forEach((link) => {
    link.classList.remove("active");

    if (link.dataset.target === targetId) {
      link.classList.add("active");
      moveIndicator(link);
    }
  });
}

/* ===== On Initial Load ===== */
window.addEventListener("load", () => {
  const activeLink = document.querySelector(".tab-link.active");
  if (activeLink) moveIndicator(activeLink);
});

/* ===== On Click on Bar Items ===== */
links.forEach((link) => {
  link.addEventListener("click", () => {
    setActiveLink(link.dataset.target);
  });
});

/* ===== On Scroll: Fix the header + Update the bubble ===== */
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    hero.classList.add("scrolled");
    document.body.classList.add("scrolled-body");
  } else {
    hero.classList.remove("scrolled");
    document.body.classList.remove("scrolled-body");
  }

  let currentSection = "";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= 430 && rect.bottom > 430) {
      currentSection = section.id;
    }
  });

  if (currentSection) {
    setActiveLink(currentSection);
  }
});