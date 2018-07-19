#!/bin/bash

# The following is a 5 column list of org, repo, branch, file, and module.
# - If the module is specified, the README for that project will be
#   pulled from npmjs.org instead and will reflect the latest release.
#   For scoped packages such as `@loopback/metadata`,  the `/` needs to
#   be encoded as `%2f`. For example `@loopback%2fmetadata`.
# - If the branch IS specified, it will be used to fetch the README.md
#   from the given github repo. If that branch is NOT master, then the
#   branch name will be appended to the local readme file name.
#
# Examples:
# strongloop loopback-next master packages/metadata/README.md
# strongloop loopback-next master packages/metadata/README.md @loopback%2fmetadata
#
(cat <<LIST_END
strongloop loopback-next master packages/metadata/README.md
strongloop loopback-next master examples/todo/README.md
strongloop loopabck-next master examples/todo-list/README.md
LIST_END
) | while read org repo branch file module; do
  if [ -z "$file" ]; then
    file="README.md"
  fi
  # Write the README.md to a file named after the repo
  DEST="pages/en/lb4/readmes/$repo/$file"
  if [ "$branch" != "master" ]; then
    DEST="pages/en/lb4/readmes/$repo-$branch/$file"
  fi
  mkdir -p `dirname "$DEST"`
  # When fetching from a branch of a gh repo
  GHURL="https://raw.githubusercontent.com/$org/$repo/$branch/$file"
  # When fetching from the latest release of a node module
  NPMURL="https://registry.npmjs.org/$module"
  if [ -n "$module" ]; then
    # No branch means latest release, so fetch from npmjs.org
    echo "fetching $module from latest npmjs.org release..."
    echo $NPMURL
    echo $DEST
    curl -s $NPMURL | jq -r '.readme|rtrimstr("\n")' > $DEST
  else
    echo "fetching $org/$repo/$branch/$file from GitHub's raw content domain..."
    curl -s $GHURL > $DEST
  fi
done
