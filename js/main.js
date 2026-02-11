/* ============================================================
 * Zeppelin Computing — main.js
 * ============================================================
 * This file contains only two small features:
 *  1. Mobile hamburger menu toggle
 *  2. Scroll-triggered fade-in animation
 *
 * Both are vanilla JS with no dependencies.
 * ============================================================ */

/*
 1 *. MOBILE MENU TOGGLE
 ---------------------
 When the hamburger button (.menu-toggle) is clicked, we toggle
 the "open" class on the nav link list. CSS handles the actual
 slide-in animation via transform.
 */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    /*
     *   Enable the CSS transition only after the page has fully
     *   settled. Without this delay, the browser would "animate"
     *   the menu from its default position to the hidden position
     *   on load, causing a brief visible flash.
     *
     *   requestAnimationFrame waits for one paint cycle, then the
     *   nested rAF waits for a second — this guarantees the initial
     *   hidden state has been rendered before we allow transitions.
     */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        navLinks.classList.add("nav-ready");
      });
    });

    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    /*
     *   Close the mobile menu if the user clicks any nav link.
     *   This prevents the menu from staying open after navigation.
     */
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  /*
   * 2. SCROLL-TRIGGERED FADE-IN
   * ---------------------------
   * Any element with the class "fade-in" will start invisible
   * (set in CSS) and smoothly appear when it scrolls into view.
   *
   * We use an IntersectionObserver, which fires a callback when
   * an observed element enters or exits the viewport. Once an
   * element becomes visible, we add the "visible" class (which
   * triggers the CSS transition) and stop observing it so the
   * animation only happens once.
   *
   * The "threshold: 0.15" means the callback fires when at least
   * 15% of the element is visible — this feels natural and avoids
   * triggering too early.
   */
  const fadeElements = document.querySelectorAll(".fade-in");

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeElements.forEach((el) => observer.observe(el));
  }
});
