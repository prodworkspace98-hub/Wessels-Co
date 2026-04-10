import { LoadComponent } from "./core/component-loader.js";
import { observeElements } from "./engines/animation-engine.js";

const componentsConfig = [
  { id: "navbar", html: "navbar.html", script: "./navigation.js" },
  { id: "hero", html: "hero.html", script: "./hero.js" },
  { id: "WhyChooseUS", html: "WhyChooseUS/WhyChooseUS-section.html", script: "./pages/WhyChooseUS.js" },
  { id: "pricingTable", html: "services/pricingTable.html", script: "./pages/pricingTable.js" },
  { id: "howItWorks", html: "skills/howItWorks.html", script: "./pages/howItWorks.js" },
  { id: "packages", html: "packages/service-packages.html", script: "./pages/service-package.js" },
  { id: "extra", html: "services/extra-service.html", script: "./pages/extra-service.js" },
  { id: "services", html: "services/services-section.html", script: "./pages/services.js" },
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