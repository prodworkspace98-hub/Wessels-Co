import { observeElements } from "../engines/animation-engine.js";

fetch("/data/service-package.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load packages data");
    return res.json();
  })
  .then((data) => {
    const section = document.getElementById("packages");
    if (!section) return;

    const heading = section.querySelector("#packages-heading");
    if (heading) heading.textContent = data.section.content.heading;

    const container = section.querySelector("#packages-cards");
    if (!container) return;

    const fragment = document.createDocumentFragment();
    const newCards = [];

    data.section.cards.forEach((card) => {
      const cardEl = document.createElement("div");
      cardEl.className = `card mx-w-generic card-effect fade-in ${card.recommended ? "recommended" : ""}`;
      cardEl.dataset.divide = card.divide;

      const content = document.createElement("div");
      content.className = "card-content package";

      const title = document.createElement("h2");
      title.textContent = card.title;

      const price = document.createElement("h3");
      price.textContent = card.price;

      const desc = document.createElement("p");
      desc.textContent = card.description;

      const ul = document.createElement("ul");
      card.features.forEach((f) => {
        const li = document.createElement("li");
        li.textContent = f;
        ul.appendChild(li);
      });

      const btn = document.createElement("a");
      btn.href = "#contact";
      btn.className = `btn w-full ${card.button.variant === "primary" ? "btn-primary" : ""}`;
      btn.textContent = card.button.text;

      content.append(title, price, desc, ul, btn);
      cardEl.appendChild(content);

      fragment.appendChild(cardEl);
      newCards.push(cardEl);
    });

    container.appendChild(fragment);
    observeElements(newCards);
  })
  .catch(console.error);
