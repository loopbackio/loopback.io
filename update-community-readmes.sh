#!/bin/bash

# The following is a 3 column list of org, repo, and branch.
# - If the branch is NOT specified, then the README for that project
#   will be pulled from npmjs.org instead and will reflect the latest
#   release.
# - If the branch IS specified, it will be used to fetch the README.md
#   from the given github repo. If that branch is NOT master, then the
#   branch name will be appended to the local readme file name.
(cat <<LIST_END
strongloop-community StrongLoop-IoT-Demo master
strongloop-community loopback-connector-elastic-search master
Sequoia loopback-json-schemas master
mean-expert-official loopback-sdk-builder master
BoLaMN loopback-supertest-models master
LIST_END
) | while read org repo branch; do
  # Write the README.md to a file named after the repo
  DEST="pages/en/community/readmes/$repo.md"
  # When fetching from a branch of a gh repo
  GHURL="https://raw.githubusercontent.com/$org/$repo/$branch/README.md"
  # When fetching from the latest release of a node module
  NPMURL="https://registry.npmjs.org/$repo"
  if [ -z "$branch" ]; then
    # No branch means latest release, so fetch from npmjs.org
    echo "fetching $org/$repo from latest npmjs.org release..."
    curl -s $NPMURL | jq -r '.readme|rtrimstr("\n")' > $DEST
  else
    # The loopback-example-database repo contains a separate branch for each
    # actual example project, so we need to add the branch name to the readme
    # name.
    if [ "$branch" != "master" ]; then
      DEST="pages/en/community/readmes/$repo-$branch.md"
    fi
    echo "fetching $org/$repo/$branch from GitHub's raw content domain..."
    curl -s $GHURL > $DEST
  fi
done
