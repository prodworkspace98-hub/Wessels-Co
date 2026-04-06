import { observeElements } from "./engines/animation-engine.js";

fetch("/data/hero.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load hero data");
    return res.json();
  })
  .then((data) => {
    const section = document.querySelector(".Header-Section .text-content");
    if (!section) return;

    const fragment = document.createDocumentFragment();
    const elements = [];

    const intro = document.createElement("div");
    intro.className = "intro-bubble fade-in";
    const introText = document.createElement("h4");
    introText.textContent = data.section.intro;
    intro.appendChild(introText);

    const h1 = document.createElement("h1");
    h1.className = "fade-in";
    h1.textContent = data.section.heading[0];

    const h1Sub = document.createElement("h1");
    h1Sub.className = "Sub-heading fade-in";
    h1Sub.textContent = data.section.heading[1];

    const h2 = document.createElement("h2");
    h2.className = "fade-in";
    h2.textContent = data.section.subheading;

    const p = document.createElement("p");
    p.className = "fade-in";
    p.textContent = data.section.description;

    fragment.append(intro, h1, h1Sub, h2, p);

    const btnWrap = document.createElement("div");
    btnWrap.className = "flex-row fade-in";

    data.section.buttons.forEach((btn) => {
      const a = document.createElement("a");
      a.href = btn.href;
      a.className = btn.class;
      a.textContent = btn.text;

      if (btn.icon) {
        const img = document.createElement("img");
        img.src = btn.icon.src;
        img.alt = btn.icon.alt;
        a.appendChild(img);
      }

      btnWrap.appendChild(a);
    });

    fragment.appendChild(btnWrap);

    section.appendChild(fragment);

    section.querySelectorAll(".fade-in").forEach((el) => elements.push(el));
    observeElements(elements);
  })
  .catch(console.error);