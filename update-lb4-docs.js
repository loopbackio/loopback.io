// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: loopback.io-workflow-scripts
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

const srcDocs = path.resolve(__dirname,'node_modules/@loopback/docs/site');
const destDocs = path.resolve(__dirname, 'pages/en/lb4');
const srcSidebars = path.resolve(srcDocs, 'sidebars');
const destSidebars= path.resolve(__dirname, '_data/sidebars');
const lb4Sidebar = yaml.safeLoad(fs.readFileSync(__dirname + '/_data/sidebars/lb4_sidebar.yml', 'utf8'));
let connectorsReference;
for (let i = 0; i < lb4Sidebar.children.length; i++) {
  const child = lb4Sidebar.children[i];
  if (child.title === 'Connectors reference') {
    connectorsReference = child;
    break;
  }
}

/**
 * Utility function to remove a directory.
 * @param {string} dir - The path of the directory to remove.
 */
function removeDir(dir) {
  try {
    fs.removeSync(dir);
  } catch (err) {
    console.error('failed to cleanup %s due to %s',
      dir, err.stack);
    process.exit(1);
  }
}
/**
 * Utility function to copy contents of a source directory to
 * a target directory. If certain files already exist, it will
 * overwrite them.
 * @param {string} src - The path of the source directory to copy from.
 * @param {string} dest - The path of the target directory to copy to.
 */
function copyDocs(src, dest) {
  try {
    fs.copySync(src, dest, {overwrite: true});
  } catch (err) {
    console.error('failed to copy latest docs %s from %s', src, err.stack);
    process.exit(1);
  }
}

// Remove the original folder so we remove files deleted from @loopback/docs
removeDir(destDocs);

// copy the latest docs from @loopback/docs to pages/en/lb4 directory
copyDocs(srcDocs, destDocs);

//copy over sidebar for LoopBack 4
copyDocs(srcSidebars, destSidebars);

function copyFile(input) {
  if (input) {
    const lb3Path = __dirname + '/pages/en/lb3/' + input.url.replace(/\.html$/, '.md');
    const lb4Path = __dirname + '/pages/en/lb4/' + input.url.replace(/\.html$/, '.md');
    // Copy only if the file does not exist in the lb4 dir
    if (!fs.existsSync(lb4Path)) {
      // Some MD files use a different casing than HTML
      // Such as SOAP-Connector.md vs. SOAP-connector.html
      if (!fs.existsSync(lb3Path)) {
        console.warn('File not found: %s', lb3Path);
        return;
      }
      let fc = fs.readFileSync(lb3Path, 'utf8');
      fc = fc.replace('/lb3/', '/lb4/').replace('lb3_sidebar', 'lb4_sidebar');
      fs.writeFileSync(lb4Path, fc);
    }

    if (input.children) {
      input.children.forEach(function(child) {
        copyFile(child);
      });
    }
  }
}

// Most of the connector doc files are in the lb3 dir, copy them for lb4
copyFile(connectorsReference);

const fileToUpdate = path.resolve(destDocs, 'Testing-the-API.md');

// bug in `jekyll-relative-links` plugin; probably safe to remove when
// https://github.com/benbalter/jekyll-relative-links/issues/5
// is resolved
if (!fs.existsSync(fileToUpdate)) return;
try {
  let contents = fs.readFileSync(fileToUpdate, 'utf-8');
  contents = contents.replace('include previous.md', 'include previous.html');
  fs.writeFileSync(fileToUpdate, contents, 'utf-8');
} catch (err) {
  console.error('failed to replace relative link %s', err.stack);
  process.exit(1);
}
