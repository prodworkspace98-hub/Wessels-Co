import { observeElements } from "../engines/animation-engine.js";

fetch("/data/extra-service.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load extra services data");
    return res.json();
  })
  .then((data) => {
    const section = document.getElementById("extra");
    if (!section) return;

     const heading = section.querySelector("#extra-heading");
    if (heading) heading.textContent = data.section.content.heading;

     const subheading = section.querySelector("#subtext");
    if (subheading) subheading.textContent = data.section.content.subheading;

    const container = section.querySelector("#extra-services-cards");
    if (!container) return;

    const fragment = document.createDocumentFragment();
    const newCards = [];

    data.section.cards.forEach((card) => {
      const cardEl = document.createElement("div");
      cardEl.className = "card fade-in card-effect";

      const content = document.createElement("div");
      content.className = "card-content";

      const title = document.createElement("h2");
      title.textContent = card.title;

      const span = document.createElement("span");
      span.className = "icon";

      if (card.icon?.src) {
        const icon = document.createElement("img");
        icon.src = card.icon.src;
        icon.alt = card.icon.alt || "";
        icon.loading = card.icon.loading || "lazy";
        span.appendChild(icon);
      }

      content.append(span,title);
      cardEl.appendChild(content);

      fragment.appendChild(cardEl);
      newCards.push(cardEl);
    });

    container.appendChild(fragment);
    observeElements(newCards);
  })
  .catch(console.error);