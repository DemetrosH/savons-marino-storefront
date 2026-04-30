const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Capture console logs
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request =>
    console.log('REQUEST FAILED:', request.url(), request.failure().errorText)
  );

  // Mobile viewport
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  
  await page.goto('http://localhost:3000/boutique', { waitUntil: 'networkidle0' });
  
  // Wait a second to allow client-side hydration
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
})();
