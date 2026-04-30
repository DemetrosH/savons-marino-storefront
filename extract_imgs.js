const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/Mitja/.gemini/antigravity/brain/a9bf28d1-c97b-4ef1-83da-bba77c82298d/.system_generated/steps/808/output.txt'));
const matches = [...data.html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];
matches.forEach((m, i) => console.log(`IMG ${i}:`, m[1]));
