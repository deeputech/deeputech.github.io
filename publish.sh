#!/bin/bash
# Build the Astro site and force-push the result to the master branch
# (which is what GitHub Pages serves at https://deepu.tech).
#
# Flags:
#   -s   skip the Dev.to syndication step
#   -c   CI mode (use $GITHUB_ACCESS_TOKEN to push, allow dirty tree)

set -euo pipefail

publishDev=true
ci=false

while getopts 'sc' opt; do
    case $opt in
        s) publishDev=false ;;
        c) ci=true ;;
        *) echo 'Error in command line parsing' >&2; exit 1 ;;
    esac
done

echo ">>> Publish to Dev.to: $publishDev"
echo ">>> CI mode: $ci"

if [ "$ci" != true ] && [ -n "$(git status --porcelain)" ]; then
    echo ">>> Working directory is not clean. Commit changes!"
    exit 1
fi

TMP_LOC=/tmp/deepu.github.io
DIST_DIR=dist

rm -rf "$DIST_DIR"
rm -rf "$TMP_LOC"

if "$publishDev"; then
    echo ">>> Publish to Dev.to and update slugs (pass -s to skip)"
    npm run publish-to-dev
    if [ -n "$(git status --porcelain)" ]; then
        git add --all
        git commit --allow-empty -am "Updated posts with Dev.to slug"
    fi
fi

echo ">>> Building Astro site"
NODE_ENV=production npm run build

echo ">>> Move build output to temp folder"
mkdir --parents "$TMP_LOC"
mv "$DIST_DIR"/* "$TMP_LOC"
# preserve dotfiles like .nojekyll if we ever add one
shopt -s dotglob nullglob
extras=("$DIST_DIR"/*)
if [ ${#extras[@]} -gt 0 ]; then
    mv "${extras[@]}" "$TMP_LOC"
fi
shopt -u dotglob nullglob

echo ">>> Checkout and clean master"
git checkout master
# Wipe everything tracked except a small allow-list (drafts, ignored dirs, .git, etc.)
find -mindepth 1 -depth -print0 \
  | grep -vEzZ '(_drafts(/|$)|node_modules(/|$)|temp(/|$)|vendor(/|$)|\.github(/|$)|\.git(/|$)|/\.gitignore$|src(/|$)|public(/|$))' \
  | xargs -0 rm -rvf || true

echo ">>> Move site from temp & publish to GitHub"
mv "$TMP_LOC"/* .
shopt -s dotglob nullglob
extras=("$TMP_LOC"/*)
if [ ${#extras[@]} -gt 0 ]; then
    mv "${extras[@]}" .
fi
shopt -u dotglob nullglob

now=$(date)
git add --all
git commit -am "Updated site on $now"
if [ "$ci" = true ]; then
    git push "https://${GITHUB_ACCESS_TOKEN}@github.com/deeputech/deeputech.github.io.git" master --force
else
    git push origin master --force
fi

echo ">>> $now: Published changes to GitHub"
git checkout site_src
