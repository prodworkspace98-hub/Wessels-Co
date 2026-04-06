fetch('/data/about.json')
  .then(res => {
    if (!res.ok) throw new Error("Failed to load about data");
    return res.json();  
  })
  .then(data => {

    document.getElementById('about-title').textContent = data.title;

    const container = document.getElementById('about-paragraphs');

    data.paragraphs.forEach(text => {
      const p = document.createElement('p');
      p.innerHTML = text; 
      container.appendChild(p);
    });

    const highlight = document.createElement('p');
    const strong = document.createElement('strong');

    strong.className = 'txt-clr center fs-20';
    strong.textContent = data.highlight;

    highlight.appendChild(strong);
    container.appendChild(highlight);

  })
  .catch(err => console.error(err));