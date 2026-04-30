const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Mobile viewport
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  
  await page.goto('http://localhost:3000/boutique', { waitUntil: 'networkidle0' });
  
  // Wait a second for any animations
  await new Promise(r => setTimeout(r, 1000));
  
  // Get element at top right (e.g. x: 350, y: 70)
  const result = await page.evaluate(() => {
    // Let's sample a grid of points on the right side
    const samples = [];
    for(let y = 35; y <= 90; y += 10) {
      for(let x = 330; x <= 370; x += 10) {
        const el = document.elementFromPoint(x, y);
        if (el) {
          samples.push({
            x, y,
            tag: el.tagName,
            id: el.id,
            className: el.className,
            text: el.textContent.substring(0, 20).replace(/\n/g, '')
          });
        }
      }
    }
    return samples;
  });
  
  // Condense results
  const uniqueElements = new Set();
  const report = [];
  for (const s of result) {
    const key = `${s.tag}.${s.className}`;
    if (!uniqueElements.has(key)) {
      uniqueElements.add(key);
      report.push(s);
    }
  }
  
  console.log(JSON.stringify(report, null, 2));
  
  await browser.close();
})();
