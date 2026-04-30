const https = require('https');
https.get('https://www.savonsmarino.ca/index.php/a-propos/', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const imgs = data.match(/https:\/\/www\.savonsmarino\.ca\/wp-content\/uploads\/[^"'\s]+\.(png|jpg|jpeg)/gi);
    if(imgs) console.log([...new Set(imgs)]);
    else console.log('no match');
  });
});
