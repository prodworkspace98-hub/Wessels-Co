fetch('/data/services.json')
  .then(res => res.json())
  .then(services => {
    const container = document.getElementById('services-container');

    services.forEach(service => {
      container.innerHTML += `
        <div class="card">
          <h3>${service.title}</h3>
          <p>${service.price}</p>
        </div>
      `;
    });
  });
  