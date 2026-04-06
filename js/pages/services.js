import { observeElements } from "../engines/animation-engine.js";

fetch("/data/services.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load services data");
    return res.json();
  })
  .then((data) => {
    const section = document.getElementById("services");
    if (!section) return;

    section.querySelector("#service-heading").textContent = data.section.content.heading;
    section.querySelector("#subtext").textContent = data.section.content.subtext;

    const container = section.querySelector("#cards");
    const fragment = document.createDocumentFragment();
    const newCards = [];

    data.section.cards.forEach((card) => {
      const cardEl = document.createElement("div");
      cardEl.className = "card card-effect fade-in";

      const content = document.createElement("div");
      content.className = "card-content";

      const icon = document.createElement("img");
      icon.src = card.icon.src;
      icon.alt = card.icon.alt;
      icon.loading = "lazy";

      const span = document.createElement("span");
      span.className = "icon";
      span.appendChild(icon);

      const title = document.createElement("h2");
      title.textContent = card.title;

      const ul = document.createElement("ul");
      card.items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });

      content.append(span, title, ul);
      cardEl.appendChild(content);

      fragment.appendChild(cardEl);
      newCards.push(cardEl);
    });

    container.appendChild(fragment);
    observeElements(newCards);
  })
  .catch(console.error);