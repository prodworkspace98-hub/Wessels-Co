import { observeElements } from "../engines/animation-engine.js";

fetch("/data/contact.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load contact data");
    return res.json();
  })
  .then((data) => {
    const section = document.getElementById("contact");
    if (!section) return;

    const headingEl = section.querySelector(".heading");
    if (headingEl) headingEl.textContent = data.section.content.heading;

    const subheading = section.querySelector(".subheading");
    if (subheading) subheading.textContent = data.section.content.subHeading;

    const container = section.querySelector(".btn-container");
    if (!container) return;

    const fragment = document.createDocumentFragment();


    container.appendChild(fragment);

    if (data.section.cta) {
      const ctaContainer = document.createElement("div");
      ctaContainer.className = "center";

      const link = document.createElement("a");
      link.href = data.section.cta.href;
      link.className = data.section.cta.class;
      link.textContent = data.section.cta.text;

      ctaContainer.appendChild(link);
      container.appendChild(ctaContainer);
    }

  })
  .catch((err) => console.error(err));