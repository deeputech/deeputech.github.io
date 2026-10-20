#!/bin/bash
# Build the Astro site and force-push the result to the master branch
# (which is what GitHub Pages serves at https://deepu.tech), then syndicate the
# posts to Dev.to.
#
# Order matters. Dev.to fetches cover_image from deepu.tech the moment the
# article is created and caches a failed fetch for months (immutable CDN
# response), so the site must be live *before* the Dev.to sync runs. That is why
# the sync is the last step and why we wait for Pages to serve the new build.
#
# Env: PAGES_WAIT = seconds to wait for the push to go live on deepu.tech
#      before syndicating (default 300).
#
# Flags:
#   -s   skip the Dev.to syndication step
#   -c   CI mode (use $GITHUB_ACCESS_TOKEN to push, allow dirty tree)
#   -d   dry run: show what *would* happen on Dev.to and skip git push.
#        The site is still built locally so you can preview ./dist.
#        No Dev.to API writes, no devto_id/url written back, no master push.

set -euo pipefail

publishDev=true
ci=false
dryRun=false

while getopts 'scd' opt; do
    case $opt in
        s) publishDev=false ;;
        c) ci=true ;;
        d) dryRun=true ;;
        *) echo 'Error in command line parsing' >&2; exit 1 ;;
    esac
done

echo ">>> Publish to Dev.to: $publishDev"
echo ">>> CI mode: $ci"
echo ">>> Dry run: $dryRun"

if [ "$ci" != true ] && [ "$dryRun" != true ] && [ -n "$(git status --porcelain)" ]; then
    echo ">>> Working directory is not clean. Commit changes!"
    exit 1
fi

TMP_LOC=/tmp/deepu.github.io
DIST_DIR=dist

rm -rf "$DIST_DIR"
rm -rf "$TMP_LOC"

echo ">>> Building Astro site"
NODE_ENV=production npm run build

# Marker for "is this build live?": the newest built post page, hashed locally
# and compared against deepu.tech after the push.
POSTS_DIR=src/content/posts
PAGES_WAIT=${PAGES_WAIT:-300}
marker_want=""
newest_slug=""
shopt -s nullglob
post_files=("$POSTS_DIR"/*.mdx "$POSTS_DIR"/*.md)
shopt -u nullglob
mapfile -t posts_newest_first < <(printf '%s\n' "${post_files[@]}" | sort -r)
for post_file in "${posts_newest_first[@]}"; do
    slug=$(basename "$post_file" | sed -E 's/^[0-9]{4}-[0-9]{2}-[0-9]{2}-//; s/\.mdx?$//')
    # Drafts and unpublished posts have no page in dist, so skip them.
    if [ -f "$DIST_DIR/$slug/index.html" ]; then
        newest_slug=$slug
        marker_want=$(md5sum "$DIST_DIR/$slug/index.html" | cut -d' ' -f1)
        break
    fi
done

if "$dryRun"; then
    if "$publishDev"; then
        echo ">>> Publish to Dev.to (pass -s to skip)"
        DRY_RUN=1 npm run publish-to-dev
    fi
    echo ""
    echo "=========================================="
    echo " Dry run complete."
    echo "  • Dev.to: see actions listed above"
    echo "  • Local build: $DIST_DIR/"
    echo "  • Preview: npm run preview"
    echo "  • No git push performed."
    echo "=========================================="
    exit 0
fi

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
# Wipe everything except gitignored / per-machine dirs and .git itself.
# src/ and public/ are NOT preserved — they belong only on site_src and
# `git checkout site_src` at the end of this script will restore them.
find -mindepth 1 -depth -print0 \
  | grep -vEzZ '(_drafts(/|$)|node_modules(/|$)|temp(/|$)|.claude(/|$)|\.github(/|$)|\.git(/|$)|/\.gitignore$|/AGENTS\.md$|/WRITING-STYLE\.md$)' \
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

if "$publishDev"; then
    echo ">>> Waiting for deepu.tech to serve this build (Dev.to pulls covers from it)"
    if [ -z "$marker_want" ]; then
        echo ">>> No marker page for '$newest_slug', skipping the wait"
    else
        page_file=$(mktemp)
        deadline=$(( $(date +%s) + PAGES_WAIT ))
        while :; do
            code=$(curl -s -m 20 -o "$page_file" -w '%{http_code}' "https://deepu.tech/$newest_slug/index.html" || true)
            got=$(md5sum < "$page_file" | cut -d' ' -f1)
            if [ "$code" = 200 ] && [ "$got" = "$marker_want" ]; then
                echo ">>> Build is live on deepu.tech"
                break
            fi
            if [ "$(date +%s)" -ge "$deadline" ]; then
                echo ">>> Timed out after ${PAGES_WAIT}s (last http=$code); continuing anyway"
                echo ">>> If a new post's cover looks broken on Dev.to, bump its ?v= and re-run."
                break
            fi
            echo "    not live yet (http=$code), retrying in 10s"
            sleep 10
        done
        rm -f "$page_file"
    fi

    echo ">>> Publish to Dev.to (pass -s to skip, -d for dry run)"
    # Capture the exit code instead of letting `set -e` abort here. Even on a
    # partial failure, posts created earlier in the run have already had their
    # devto_id/url written to disk, and those write-backs MUST be committed —
    # otherwise the next run re-CREATEs them and collides on canonical_url.
    set +e; npm run publish-to-dev; rc=$?; set -e
    if [ -n "$(git status --porcelain)" ]; then
        git add --all
        git commit --allow-empty -am "Updated posts with Dev.to slug"
    fi
    if [ "$rc" -ne 0 ]; then exit "$rc"; fi
fi
