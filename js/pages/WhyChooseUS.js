import { observeElements } from "../engines/animation-engine.js";

fetch("./data/WhyChooseUS.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load WhyChooseUS data");
    return res.json();
  })
  .then((data) => {
    console.log("WhyChooseUS data:", data);

    const section = document.getElementById("WhyChooseUS");
    if (!section) {
      console.warn("WhyChooseUS section not found");
      return;
    }

    const headingEl = section.querySelector("#WhyChooseUS-heading");
    const container = section.querySelector("#WhyChooseUS-cards");

    if (!container) {
      console.warn("WhyChooseUS cards container not found");
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
      cardEl.className = "card card-effect fade-in";

      const content = document.createElement("div");
      content.className = "card-content";

      const span = document.createElement("span");
      span.className = "icon";

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

      content.append(span, title, ul);
      cardEl.appendChild(content);

      fragment.appendChild(cardEl);
      newCards.push(cardEl);
    });

    container.appendChild(fragment);

    observeElements(newCards);
  })
  .catch((err) => {
    console.error("WhyChooseUS error:", err);
  });
