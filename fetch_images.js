const https = require('https');

https.get('https://www.savonsmarino.ca/cours-savons/', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const images = [];
    while ((match = regex.exec(data)) !== null) {
      images.push(match[1]);
    }
    console.log(images.filter(url => !url.includes('data:image')));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
