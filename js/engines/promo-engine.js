fetch("data/promotions.json")
  .then((res) => res.json(0))
  .then((promos) => {
    promos.forEach((promo) => {
      fetch(`/promotions/${promo.file}`)
        .then((res) => res.text())
        .then((html) => {
          document.getElementById("promo-container").innerHTML += html;
        });
    });
  });
