import { observeElements } from "../engines/animation-engine.js";

fetch("/data/skills.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load skills data");
    return res.json();
  })
  .then((data) => {
    const section = document.getElementById("skills");
    if (!section) return;

    const heading = section.querySelector("#skill-heading");
    if (heading) heading.textContent = data.section.content.heading;

    const container = section.querySelector("#skill-cards");
    if (!container) return;

    const fragment = document.createDocumentFragment();
    const newCards = [];

    data.section.cards.forEach((card) => {
      const cardEl = document.createElement("div");
      cardEl.className = "card mx-w-generic fade-in";
      cardEl.dataset.divide = card.dataDivide;

      const content = document.createElement("div");
      content.className = "card-content";

      const title = document.createElement("h2");
      title.textContent = card.title;

      const tabsWrap = document.createElement("div");
      tabsWrap.className = "tabs-wrap";

      card.tabs.forEach((tab) => {
        const span = document.createElement("span");
        span.className = "tab";
        span.textContent = tab;
        tabsWrap.appendChild(span);
      });

      content.append(title, tabsWrap);
      cardEl.appendChild(content);

      fragment.appendChild(cardEl);
      newCards.push(cardEl);
    });

    container.appendChild(fragment);
    observeElements(newCards);
  })
  .catch(console.error);