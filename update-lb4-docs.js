const fs = require('fs-extra');
const path = require('path');

const srcDocs = path.resolve(__dirname,'node_modules/@loopback/docs/site');
const destDocs = path.resolve(__dirname, 'pages/en/lb4');
const srcSidebars = path.resolve(srcDocs, 'sidebars');
const destSidebars= path.resolve(__dirname, '_data/sidebars');

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

// copy the latest docs from @loopback/docs to pages/en/lb4 directory
copyDocs(srcDocs, destDocs);

//copy over sidebar for LoopBack 4
copyDocs(srcSidebars, destSidebars);

//clean up sidebar dir
removeDir(srcSidebars);



const fileToUpdate = path.resolve(destDocs, 'Testing-the-API.md');

// bug in `jekyll-relative-links` plugin; probably safe to remove when
// https://github.com/benbalter/jekyll-relative-links/issues/5
// is resolved
try {
  let contents = fs.readFileSync(fileToUpdate, 'utf-8');
  contents = contents.replace('include previous.md', 'include previous.html');
  fs.writeFileSync(fileToUpdate, contents, 'utf-8');
} catch (err) {
  console.error('failed to replace relative link %s', err.stack);
  process.exit(1);
}
