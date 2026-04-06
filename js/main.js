import { LoadComponent } from "./core/component-loader.js";
import { observeElements } from "./engines/animation-engine.js";

const componentsConfig = [
  { id: "navbar", html: "navbar.html", script: "./navigation.js" },
  { id: "hero", html: "hero.html", script: "./hero.js" },
  { id: "about", html: "about/about-section.html", script: "./pages/about.js" },
  { id: "services", html: "services/services-section.html", script: "./pages/services.js" },
  { id: "skills", html: "skills/skills.html", script: "./pages/skills.js" },
  { id: "packages", html: "packages/service-packages.html", script: "./pages/service-package.js" },
  { id: "extra", html: "services/extra-service.html", script: "./pages/extra-service.js" },
  { id: "addon", html: "services/addon-service.html", script: "./pages/addOn.js" },
  { id: "contact", html: "contact/contact.html", script: "./pages/contact.js" },
  { id: "footer", html: "footer.html", script: "./footer.js" },
];

async function initComponents() {
  await Promise.all(componentsConfig.map(c => LoadComponent(c.id, c.html)));

  observeElements(document.querySelectorAll(".fade-in"));

  await Promise.all(
    componentsConfig
      .filter(c => document.getElementById(c.id))
      .map(c => import(c.script))
  );
}

document.addEventListener("DOMContentLoaded", initComponents);


window.addEventListener("load", () => document.body.classList.add("loaded"));