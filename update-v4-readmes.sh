#!/bin/bash

# The following is a 5 column list of org, repo, branch, package, and file.
# - If the branch is NOT specified, then the README for that project
#   will be pulled from npmjs.org instead and will reflect the latest
#   release.
# - If the branch IS specified, it will be used to fetch the README.md
#   from the given github repo. If that branch is NOT master, then the
#   branch name will be appended to the local readme file name.
(cat <<LIST_END
strongloop loopback-next master metadata README.md
LIST_END
) | while read org repo branch package file; do
  if [ -z "$file" ]; then
    file="README.md"
  fi
  # Write the README.md to a file named after the repo
  mkdir -p "pages/en/lb4/readmes"
  DEST="pages/en/lb4/readmes/$package.md"
  # When fetching from a branch of a gh repo
  GHURL="https://raw.githubusercontent.com/$org/$repo/$branch/packages/$package/$file"
  # When fetching from the latest release of a node module
  NPMURL="https://registry.npmjs.org/@loopback/$package"
  if [ -z "$branch" ]; then
    # No branch means latest release, so fetch from npmjs.org
    echo "fetching @loopback/$package from latest npmjs.org release..."
    curl -s $NPMURL | jq -r '.readme|rtrimstr("\n")' > $DEST
  else
    # The loopback-example-database repo contains a separate branch for each
    # actual example project, so we need to add the branch name to the readme
    # name.
    if [ "$branch" != "master" ]; then
      DEST="pages/en/lb4/readmes/$package-$branch.md"
    fi
    echo "fetching $org/$repo/$branch/packages/$package from GitHub's raw content domain..."
    curl -s $GHURL > $DEST
  fi
done
