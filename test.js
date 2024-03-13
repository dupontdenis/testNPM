const _ = require('lodash');
const path = require('path');
const fs = require('fs').promises;
 
async function run() {
  const response = await fs.readFile("data.json");
  const json = await JSON.parse(response);
  const sorted = _.sortBy(json, ["public_reactions_count"], ['desc']);
  const top5 = _.take(sorted, 5);
 
  const filePrefix = new Date().toISOString().split('T')[0];
  await fs.writeFile(path.join(__dirname, `${filePrefix}-feed.json`), JSON.stringify(top5, null, 1));
}
 
run();
