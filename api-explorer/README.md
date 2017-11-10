# Hosted API Explorer

This directory contains [swagger-ui](https://github.com/swagger-api/swagger-ui) assets that serve as a hosted API Explorer for LoopBack 4 applications. The UI will be available at https://loopback.io/api-explorer?url=*your-openapi-or-swagger-spec-url*.

To upgrade swagger-ui to a newer version:

1. Update the [`swagger-ui-dist`](https://www.npmjs.com/package/swagger-ui-dist) version in [package.json](https://github.com/strongloop/loopback.io/blob/gh-pages/package.json). You can use `npm update swagger-ui-dist`.

2. Run `npm install` which in turn executes `./update-swagger-ui.sh` to copy files into `api-explorer`.

3. Create a pull request to merge changes in `./api-explorer` directory to `gh-pages1 branch.


