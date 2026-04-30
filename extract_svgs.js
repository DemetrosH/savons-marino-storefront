const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/Mitja/.gemini/antigravity/brain/a9bf28d1-c97b-4ef1-83da-bba77c82298d/.system_generated/steps/808/output.txt'));
const matches = data.html.match(/<svg.*?<\/svg>/gi);
if (matches) {
  matches.forEach((m, i) => console.log(`SVG ${i}:`, m.substring(0, 100) + '...'));
} else {
  console.log("No SVGs found");
}
