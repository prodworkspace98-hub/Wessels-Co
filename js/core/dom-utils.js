export function createCard({ title, description, icon }) {
  const card = document.createElement("div");
  card.className = "card fade-in";

  const content = document.createElement("div");
  content.className = "card-content";

  const iconWrapper = document.createElement("span");
  iconWrapper.className = "icon-badge";

  const img = document.createElement("img");
  img.src = icon.src;
  img.alt = icon.alt;
  img.loading = "lazy";

  const textWrapper = document.createElement("div");

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const p = document.createElement("p");
  p.textContent = description;

  iconWrapper.appendChild(img);
  textWrapper.append(h2, p);
  content.append(iconWrapper, textWrapper);
  card.appendChild(content);

  return card;
}