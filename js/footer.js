fetch("/data/footer.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load footer data");
    return res.json();
  })
  .then((data) => {
    const footer = document.querySelector(".footer");
    if (!footer) return;

    const brandDiv = footer.querySelector(".footer__brand");
    if (brandDiv) {
      brandDiv.innerHTML = "";

      const title = document.createElement("h1");
      title.className = "footer__title";
      title.textContent = data.section.brand.title;

      const tagline = document.createElement("p");
      tagline.className = "footer__tagline";
      tagline.textContent = data.section.brand.tagline;

      brandDiv.append(title, tagline);
    }

    const linksDiv = footer.querySelector(".footer__links .flex-row");
    if (linksDiv) {
      linksDiv.innerHTML = "";

      data.section.links.forEach((link) => {
        const a = document.createElement("a");
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";

        const img = document.createElement("img");
        img.src = link.icon;
        img.alt = link.alt;
        img.loading = "lazy";

        a.setAttribute("aria-label", link.alt);
        a.setAttribute("aria-label", link.alt);
        
        a.appendChild(img);
        linksDiv.appendChild(a);
      });
    }

    const bottom = footer.querySelector(".footer__bottom p.center");
    if (bottom) {
      bottom.textContent = data.section.copyright;
    }
  })
  .catch(console.error);
