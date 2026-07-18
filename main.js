/* Antonios Sigalas — portfolio interactions (vanilla, progressive enhancement) */
(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Scroll-reveal + nav shadow + progress + scrollspy
  const nav = document.getElementById("nav");
  const progressBar = document.getElementById("progressBar");
  const navLinks = Array.from(document.querySelectorAll(".nav-links a[data-nav]"));
  const sections = ["about", "certs", "work", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            ro.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => ro.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // Scrollspy — highlight active nav link
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.id;
            navLinks.forEach((l) =>
              l.classList.toggle("active", l.getAttribute("href") === "#" + id)
            );
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  // Nav border + scroll progress (throttled via rAF)
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const st = window.scrollY || document.documentElement.scrollTop;
      if (nav) nav.classList.toggle("scrolled", st > 10);
      if (progressBar) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
      }
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Cursor spotlight (desktop, pointer:fine, motion allowed)
  const glow = document.querySelector(".cursor-glow");
  const fine = window.matchMedia("(pointer: fine)").matches;
  if (glow && fine && !reduced) {
    let gx = window.innerWidth / 2,
      gy = window.innerHeight / 2,
      cx = gx,
      cy = gy,
      raf = null;
    window.addEventListener(
      "mousemove",
      (ev) => {
        gx = ev.clientX;
        gy = ev.clientY;
        glow.style.opacity = "1";
        if (!raf) loop();
      },
      { passive: true }
    );
    document.addEventListener("mouseleave", () => (glow.style.opacity = "0"));
    function loop() {
      cx += (gx - cx) * 0.12;
      cy += (gy - cy) * 0.12;
      glow.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
      if (Math.abs(gx - cx) > 0.5 || Math.abs(gy - cy) > 0.5) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    }
  }
})();
