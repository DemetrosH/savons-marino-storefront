const fs = require('fs');

async function extract() {
  const res = await fetch('https://savonsmarino.ca/sur-mesure/');
  const html = await res.text();
  
  const imgRegex = /https:\/\/www\.savonsmarino\.ca\/wp-content\/uploads\/[^\s"'>]+(?:\.jpg|\.jpeg|\.png|\.webp)/ig;
  const urls = new Set();
  let m;
  while ((m = imgRegex.exec(html)) !== null) {
    if (!m[0].includes('-150x') && !m[0].includes('-300x') && !m[0].includes('-100x') && !m[0].includes('-768x') && !m[0].includes('cropped')) {
      urls.add(m[0]);
    }
  }
  
  console.log(JSON.stringify(Array.from(urls), null, 2));
}

extract();
