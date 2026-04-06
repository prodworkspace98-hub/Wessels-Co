import { observeElements } from "../engines/animation-engine.js";
import { createCard } from "../core/dom-utils.js"

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

    const cardsContainer = section.querySelector(".contact-cards");
    if (!cardsContainer) return;

    const fragment = document.createDocumentFragment();
    const newCards = [];

    data.section.cards.forEach((card) => {
      const elementCard = createCard({
        title: card.title,
        description: card.text,
        icon: card.icon,
      });

      elementCard.classList.add("mx-w-generic", "w-full", "flex-row");
      elementCard.dataset.divide = 2;

      fragment.appendChild(elementCard);
      newCards.push(elementCard);
    });

    cardsContainer.appendChild(fragment);

    if (data.section.cta) {
      const ctaContainer = document.createElement("div");
      ctaContainer.className = "center mY-generic";
      ctaContainer.dataset.space = 5;

      const link = document.createElement("a");
      link.href = data.section.cta.href;
      link.className = data.section.cta.class;
      link.textContent = data.section.cta.text;

      ctaContainer.appendChild(link);
      section.appendChild(ctaContainer);
    }

    observeElements(newCards);
  })
  .catch((err) => console.error(err));