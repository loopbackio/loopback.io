#!/bin/bash

# The following is a 3 column list of org, repo, and branch.
# - If the branch is NOT specified, then the README for that project
#   will be pulled from npmjs.org instead and will reflect the latest
#   release.
# - If the branch IS specified, it will be used to fetch the README.md
#   from the given github repo. If that branch is NOT master, then the
#   branch name will be appended to the local readme file name.
(cat <<LIST_END
strongloop loopback-connector-mysql master
strongloop loopback-connector-cassandra master
strongloop loopback-connector-cloudant master
strongloop loopback-connector-dashdb master
strongloop loopback-connector-db2 master
strongloop loopback-connector-db2iseries master
strongloop loopback-connector-db2z master
strongloop loopback-connector-grpc master
strongloop loopback-connector-informix master
strongloop loopback-connector-jsonrpc master
strongloop loopback-connector-kv-redis master
strongloop loopback-connector-mongodb master
strongloop loopback-connector-mqlight master
strongloop loopback-connector-mssql master
strongloop loopback-connector-zosconnectee master
strongloop loopback-connector-openapi master
strongloop loopback-connector-oracle master
strongloop loopback-oracle-installer master
strongloop loopback-connector-postgresql master
strongloop loopback-connector-remote master
strongloop loopback-connector-rest master
strongloop loopback-connector-soap master
strongloop strong-soap master
strongloop-community loopback-android-getting-started master
strongloop loopback-example-angular master
strongloop loopback-example-app-logic master
strongloop loopback-example-access-control master
strongloop loopback-example-angular-live-set master
strongloop loopback-example-database mssql
strongloop loopback-example-database mysql
strongloop loopback-example-database oracle
strongloop loopback-example-database postgresql
strongloop loopback-example-database master
strongloop loopback-example-kv-connectors master
strongloop loopback-example-mixins master
strongloop loopback-example-offline-sync master
strongloop loopback-example-passport master
strongloop loopback-example-relations master
strongloop loopback-example-storage master
strongloop loopback-example-user-management master
strongloop-community loopback-ios-getting-started master
strongloop strong-error-handler master
strongloop strong-remoting master
strongloop angular-live-set
strongloop loopback-component-storage master
strongloop loopback-component-explorer master
strongloop loopback-component-push master
strongloop loopback-component-passport master
strongloop loopback-component-oauth2 master
strongloop strong-pubsub master
strongloop strong-pubsub-bridge master
strongloop strong-pubsub-mqtt master
strongloop strong-pubsub-redis master
strongloop strong-pubsub-primus master
strongloop strong-pubsub-example master
strongloop loopback-datatype-geopoint master
strongloop-community loopback-example-pubsub master
strongloop-community loopback-connector-redis master
strongloop-community loopback-connector-sqlite3 master
strongloop-community loopback-example-connector remote
strongloop-community loopback-example-connector rest
strongloop-community loopback-example-connector soap
strongloop-community loopback-example-middleware master
strongloop-community loopback-example-isomorphic master
strongloop-community loopback-example-xamarin master
LIST_END
) | while read org repo branch; do
  # Write the README.md to a file named after the repo
  DEST="pages/en/lb3/readmes/$repo.md"
  # When fetching from a branch of a gh repo
  GHURL="https://raw.githubusercontent.com/$org/$repo/$branch/README.md"
  # When fetching from the latest release of a node module
  NPMURL="https://registry.npmjs.org/$repo"
  if [ -z "$branch" ]; then
    # No branch means latest release, so fetch from npmjs.org
    echo "fetching $org/$repo from latest npmjs.org release..."
    curl -s $NPMURL | jq -r '.readme|rtrimstr("\n")' > $DEST
    LB4DEST=${DEST/\/lb3\//\/lb4\/}
    echo "copying $DEST to $LB4DEST"
    cp $DEST $LB4DEST
  else
    # The loopback-example-database repo contains a separate branch for each
    # actual example project, so we need to add the branch name to the readme
    # name.
    if [ "$branch" != "master" ]; then
      DEST="pages/en/lb3/readmes/$repo-$branch.md"
    fi
    echo "fetching $org/$repo/$branch from GitHub's raw content domain..."
    curl -s $GHURL > $DEST
    LB4DEST=${DEST/\/lb3\//\/lb4\/}
    echo "copying $DEST to $LB4DEST"
    cp $DEST $LB4DEST
  fi
done
