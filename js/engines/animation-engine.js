export function observeElements(elements = []) {
  if (!elements || typeof elements.forEach !== "function") {
    console.warn("observeElements: invalid elements", elements);
    return;
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  });

  elements.forEach((el, index) => {
    if (el.dataset.animated) return;

    el.dataset.animated = "true";
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
}