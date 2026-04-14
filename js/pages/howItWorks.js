import { observeElements } from "../engines/animation-engine.js";

fetch("./data/howItWorks.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load How it works data");
    return res.json();
  })
  .then((data) => {

    const section = document.getElementById("howItWorks");
    if (!section) {
      console.warn("How It Works section not found");
      return;
    }

    const headingEl = section.querySelector("#howItWorks-heading");
    const container = section.querySelector("#howItWorks-cards");

    if (!container) {
      console.warn("How it works cards container not found");
      return;
    }

    container.innerHTML = "";

    if (headingEl && data?.content?.heading) {
      headingEl.textContent = data.content.heading;
    }

    const fragment = document.createDocumentFragment();
    const newCards = [];

    (data?.cards || []).forEach((card) => {
      if (!card) return;

      const cardEl = document.createElement("div");
      cardEl.className = "card card-effect flat-card fade-in";

      const content = document.createElement("div");
      content.className = "card-content";

      const span = document.createElement("div");
      const holder = document.createElement("div");

      const num = document.createElement("span");
      num.className = "number";
      num.textContent = card.number || "";

      holder.append(num);

      if (card.icon?.src) {
        const icon = document.createElement("img");
        icon.src = card.icon.src;
        icon.alt = card.icon.alt || "";
        icon.loading = card.icon.loading || "lazy";
        span.appendChild(icon);
      }

      const title = document.createElement("h2");
      title.textContent = card.title || "";

      const ul = document.createElement("ul");
      (card.items || []).forEach((item) => {
        if (!item) return;
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });

      content.append(holder, span, title, ul);
      cardEl.appendChild(content);

      fragment.appendChild(cardEl);
      newCards.push(cardEl);
    });

    container.appendChild(fragment);

    observeElements(newCards);
  })
  .catch((err) => {
    console.error("How It Works error:", err);
  });
