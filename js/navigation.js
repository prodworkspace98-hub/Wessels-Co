fetch("/data/navigation.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load navbar data");
    return res.json();
  })
  .then((data) => {
    const header = document.querySelector("header");
    if (!header) return;

    header.innerHTML = "";

    const logoLink = document.createElement("a");
    logoLink.href = data.section.logo.href;

    const logoImg = document.createElement("img");
    logoImg.src = data.section.logo.src;
    logoImg.alt = data.section.logo.alt;

    logoLink.appendChild(logoImg);

    const nav = document.createElement("nav");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = "tab-Menu";
    input.hidden = true;

    const label = document.createElement("label");
    label.setAttribute("for", "tab-Menu");
    label.className = "Menu-icon";

    const span = document.createElement("span");
    label.appendChild(span);

    const ul = document.createElement("ul");
    ul.className = "mb-nav";

    data.section.menu.forEach((item) => {
      const li = document.createElement("li");

      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.text;

      a.addEventListener("click", () => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (isMobile) input.checked = false;
      });

      li.appendChild(a);
      ul.appendChild(li);
    });

    nav.append(input, label, ul);
    header.append(logoLink, nav);

    document.addEventListener("click", (e) => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      if (isMobile && input.checked && !nav.contains(e.target)) {
        input.checked = false;
      }
    });
  })
  .catch(console.error);
