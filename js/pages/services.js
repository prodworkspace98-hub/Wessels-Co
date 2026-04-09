import { observeElements } from "../engines/animation-engine.js";

async function loadServices() {
  try {
    const res = await fetch("/data/services.json");
    if (!res.ok) throw new Error("Failed to load services data");

    const data = await res.json();

    const section = document.getElementById("services");
    if (!section) return;

    const heading = section.querySelector("#service-heading");
    const subtext = section.querySelector("#subtext");
    const subtextHV = section.querySelector("#subtext-high-value");

    const container = section.querySelector("#cards");
    const containerHv = section.querySelector("#cards-high-value");

    if (!container || !containerHv) return;

    
    heading.textContent = data.section.content.heading;
    subtext.textContent = data.section.content.subtext;
    subtextHV.textContent = data.sectionHV.content.subtext;

    // Fragments (IMPORTANT: separate)
    const fragment = document.createDocumentFragment();
    const fragmentHv = document.createDocumentFragment();

    const newCards = [];

    
    function createCard(card) {
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

      content.append(span, title);
      cardEl.appendChild(content);

      return cardEl;
    }


    data.section.cards.forEach((card) => {
      const cardEl = createCard(card);
      fragment.appendChild(cardEl);
      newCards.push(cardEl);
    });

    // High-value cards (4)
    data.sectionHV.cards.forEach((card) => {
      const cardEl = createCard(card);
      fragmentHv.appendChild(cardEl);
      newCards.push(cardEl);
    });

    // Append correctly
    container.appendChild(fragment);
    containerHv.appendChild(fragmentHv);

    observeElements(newCards);

  } catch (err) {
    console.error(err);
  }
}

loadServices();