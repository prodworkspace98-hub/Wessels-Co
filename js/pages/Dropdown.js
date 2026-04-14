import { observeElements } from "../engines/animation-engine.js";

fetch("/data/Dropdown.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load FAQ data");
    return res.json();
  })
  .then((data) => {
    const section = document.getElementById(data.section.id);
    if (!section) return;

    const headingEl = section.querySelector(".heading");
    if (headingEl) headingEl.textContent = data.section.content.heading;

    const subheadingEl = section.querySelector(".subheading");
    if (subheadingEl)
      subheadingEl.textContent = data.section.content.subHeading;

    const container = section.querySelector(".dropdown-group");
    if (!container) return;

    container.innerHTML = "";

    const fragment = document.createDocumentFragment();

    data.section.faqs.forEach((faq) => {
      const details = document.createElement("details");

      const summary = document.createElement("summary");

      const wrapper = document.createElement("div");

      const number = document.createElement("h1");
      number.textContent = faq.id;

      const questionText = document.createTextNode(` ${faq.question}`);

      wrapper.appendChild(number);
      wrapper.appendChild(questionText);

      const icon = document.createElement("span");
      icon.className = "icon";

      summary.appendChild(wrapper);
      summary.appendChild(icon);

      const answer = document.createElement("p");
      answer.textContent = faq.answer;

      details.appendChild(summary);
      details.appendChild(answer);

      fragment.appendChild(details);
    });

    container.appendChild(fragment);

    observeElements();
  })
  .catch((err) => console.error(err));
