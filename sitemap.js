// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: loopback.io-workflow-scripts
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

const fs = require('fs-extra');
const xml2js = require('xml2js');

// Read sitemap.xml
const sitemap = fs.readFileSync('./_site/sitemap.xml', {encoding:'utf-8'});

// Convert XML to JSON
xml2js.parseString(sitemap, function(err, json) {
  // Create a list of URLs -- replacing localhost with loopback.io
  const lines = [];
  json.urlset.url.forEach(url => {
    let link = url.loc[0];
    lines.push(link);
  });

  // Write SiteMap as JSON for other tools
  fs.writeJSONSync('_site/sitemap.json', json);
  
  // Write txt file of list of all links
  fs.writeFileSync('_site/sitemap.txt', lines.join('\n'));
});
