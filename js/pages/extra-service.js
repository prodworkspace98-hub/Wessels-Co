import { observeElements } from "../engines/animation-engine.js";

fetch("/data/extra-service.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load extra services data");
    return res.json();
  })
  .then((data) => {
    const section = document.getElementById("extra");
    if (!section) return;

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

      const subtitle = document.createElement("span");
      subtitle.textContent = card.subtitle;

      const price = document.createElement("h3");
      price.textContent = card.price;

      const ul = document.createElement("ul");
      card.features.forEach((f) => {
        const li = document.createElement("li");
        li.textContent = f;
        ul.appendChild(li);
      });

      content.append(title, subtitle, price, ul);
      cardEl.appendChild(content);

      fragment.appendChild(cardEl);
      newCards.push(cardEl);
    });

    container.appendChild(fragment);
    observeElements(newCards);
  })
  .catch(console.error);