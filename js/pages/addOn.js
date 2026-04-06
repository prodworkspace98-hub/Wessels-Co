import { observeElements } from "../engines/animation-engine.js";

fetch("/data/addon.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load add-on services data");
    return res.json();
  })
  .then((data) => {
    const section = document.querySelector(".add-on-table");
    if (!section) return;

    const heading = section.querySelector("h1");
    if (heading) heading.textContent = data.section.content.heading;

    const fragment = document.createDocumentFragment();
    const rowsToAnimate = [];

    data.section.groups.forEach((group) => {
      const groupDiv = document.createElement("div");
      groupDiv.className = "w-full";

      group.rows.forEach((row) => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "row fade-in";

        const col1 = document.createElement("div");
        col1.className = "col";
        col1.textContent = row.service;

        const col2 = document.createElement("div");
        col2.className = "col";
        col2.textContent = row.price;

        rowDiv.append(col1, col2);
        groupDiv.appendChild(rowDiv);
        rowsToAnimate.push(rowDiv);
      });

      fragment.appendChild(groupDiv);
    });

    section.appendChild(fragment);
    observeElements(rowsToAnimate);
  })
  .catch(console.error);