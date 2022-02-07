#!/bin/bash

publishDev=true
ci=false

while getopts 'sc' opt; do
    case $opt in
        s) publishDev=false ;;
        c) ci=true ;;
        *) echo 'Error in command line parsing' >&2
            exit 1
    esac
done

echo "Publish dev: $publishDev"
echo "Ci: $ci"

# check if $ci is true or git status is clean
if [ "$ci" = true ] || [ -z "$(git status --porcelain)" ]; then
    echo ">>> Working directory clean"
    TMP_LOC=/tmp/deepu.github.io

    /bin/rm -rf _site || exit
    /bin/rm -rf $TMP_LOC || exit

    if "$publishDev"; then
        echo ">> Publish to Dev.to and update slugs (pass -s to skip)"
        npm run publish-to-dev || exit
        git add --all || exit
        git commit --allow-empty -am "Updated posts with Dev.to slug" || exit
    fi

    echo ">> Building site"
    bundle update listen || exit
    JEKYLL_ENV=production bundle exec jekyll build || exit
    npm run optimize || exit


    echo ">> Move site to temp folder"
    mkdir --parents $TMP_LOC || exit
    mv _site/* $TMP_LOC || exit

    echo ">> Checkout and clean master"
    git branch
    git checkout master || exit
    find -mindepth 1 -depth -print0 | grep -vEzZ '(_drafts(/|$)|node_modules(/|$)|temp(/|$)|vendor(/|$)|.github(/|$)|\.git(/|$)|/\.gitignore$)' | xargs -0 rm -rvf || exit

    echo ">> Move site form temp & publish to GitHub"
    mv $TMP_LOC/* . || exit
    now=$(date)
    git add --all || exit
    git commit -am "Updated site on $now" || exit
    if [ "$ci" = true ]; then
        git push https://$GITHUB_TOKEN@github.com/deeputech/deeputech.github.io.git master --force || exit
    else
        git push origin master --force || exit
    fi

    echo ">> $now: Published changes to GitHub"

    git checkout site_src
else
    echo ">> Working directory is not clean. Commit changes!"
    exit
fi
