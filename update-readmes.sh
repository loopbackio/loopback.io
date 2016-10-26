#!/bin/sh

# git clone https://github.com/strongloop/get-readmes.git
node get-readmes/get-readmes.js --out=pages/en/lb2/readmes/ --repos=_data/repos-examples.json
node get-readmes/get-readmes.js --out=pages/en/lb2/readmes/ --repos=_data/repos-connectors.json
node get-readmes/get-readmes.js --out=pages/en/lb2/readmes/ --repos=_data/repos-other.json
