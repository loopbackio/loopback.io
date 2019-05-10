#!/usr/bin/env node
// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: loopback.io-workflow-scripts
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const path = require('path');
const fs = require('fs-extra');

async function upgradeSwaggerUI() {
  const sourceDir = path.dirname(
    require.resolve('swagger-ui-dist/package.json')
  );
  const pkg = require('swagger-ui-dist/package.json');
  const swaggerUIModule = `swagger-ui-dist@${pkg.version}`;
  
  console.log('Swagger UI %s found in %s.', swaggerUIModule, sourceDir);

  const targetDir = __dirname;

  const filesToKeep = [
    'README.md',
    'package.json',
    '.npmignore',
    'index.loopback.html',
    'oauth2-redirect.loopback.html',
    'upgrade-swagger-ui.js'
  ];

  const filterFunc = (src, dest) => {
    const file = path.basename(src);
    return filesToKeep.indexOf(file) === -1;
  };

  const files = await fs.readdir(targetDir);
  const filesToRemove = files.filter(f => filesToKeep.indexOf(f) === -1);

  for (const f of filesToRemove) {
    await fs.remove(path.join(targetDir, f));
  }

  await fs.copy(sourceDir, targetDir, { filter: filterFunc });

  // Overlay index.html
  await fs.copy(
    path.join(targetDir, 'index.loopback.html'),
    path.join(targetDir, 'index.html')
  );

  await fs.copy(
    path.join(targetDir, 'oauth2-redirect.loopback.html'),
    path.join(targetDir, 'oauth2-redirect.html')
  );

  console.log(`API Explorer has been upgrades to swagger-ui-dist@${pkg.version}.`);
  console.log();
  console.log(`Please create a github pull request against gh-pages branch with changes in ${targetDir}.`);
}

upgradeSwaggerUI();
