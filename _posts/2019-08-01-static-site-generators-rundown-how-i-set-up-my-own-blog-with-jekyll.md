---
title: "Static Site Generators rundown - How I set up my own blog with Jekyll"
published: true
description: Static Site Generators comparison - How I set up my own blog with Jekyll & custom Tags to cross-post with Dev.to
tags: [showdev, ruby, Jekyll, blogging]
cover_image: https://thepracticaldev.s3.amazonaws.com/i/qctnwfe63xb8xxp9e6pu.jpg
canonical_url: https://deepu.tech/static-site-generators-rundown-how-i-set-up-my-own-blog-with-jekyll/
devto_url: https://dev.to/deepu105/static-site-generators-rundown-how-i-set-up-my-own-blog-with-jekyll-2ic5
devto_id: 150976
---

Some time ago I decided to move my blogs from [Medium](https://medium.com/@deepu105) to [Dev.to](https://dev.to/deepu105), I have detailed the reasons in the below post.

{% link https://dev.to/deepu105/why-i-m-moving-away-from-medium-13ki %}

A lot of people suggested in the comments to set up my own blog and cross-post to Dev.to instead of relying only on one platform and I completely agree with them. I was procrastinating setting up my own blog for quite some time now. Finally, I decided to do it and set up my own blog at [https://deepu.tech/blogs/](https://deepu.tech/blogs/) in the process I also updated my personal website to use the same platform.

So when I decided to do this finally I had to choose a blogging platform and there were few requirements I was keen about which influenced my decision.

## Requirements

1. The platform should support writing posts using [Markdown](https://en.wikipedia.org/wiki/Markdown) with code syntax highlights
2. I love the Dev community and hence wanted to cross-post everything to [Dev.to](https://dev.to/deepu105) as well without having to make any changes to the post. Means I would author once and publish to both my blog and Dev. This means some constraints/requirements
    1. It should support customizable [front matter](https://jekyllrb.com/docs/front-matter/) so that I can align it with Dev
    2. It should support the [custom liquid tags](https://dev.to/new#liquidtags) used by Dev or I should be able to easily add those
3. I should be able to have custom pages for my personal website
4. Should be open source and have a good stable community
5. Should be theme-able, have plugins for SEO, search and so on
6. Should be statically generated and reasonably fast
7. Should be able to host using GitHub pages - This was an optional requirement

## The options rundown

With these in mind, I started evaluating some of the popular options below.

### [Jekyll](https://jekyllrb.com/)

**Pros**:

-   I have experience with Jekyll since I built the new [JHipster website](https://www.jhipster.tech/) using it
-   Supports Markdown, Liquid tags and Front Matter
-   Supports custom pages, themes, plugins and is statically generated
-   Is OSS and has a vibrant community
-   Can be hosted on GitHub

**Cons**:

-   I would have to build or find replacements for the custom Liquid tags used by Dev
-   I don't have much experience with Ruby and I'm not very familiar with the Ruby ecosystem
-   Not the fastest among the options. Becomes slower as site size increases

### [Hugo](https://gohugo.io/)

**Pros**:

-   Is very fast
-   I have extensive experience with Go and Go templates which would be helpful
-   Supports Markdown and Front Matter
-   Supports custom pages, themes and is statically generated
-   Is OSS and has a vibrant community
-   Can be hosted on GitHub

**Cons**:

-   Doesn't support Liquid tags
-   Doesn't have plugins. The built-in options are enough for my requirements at the moment though

### [VuePress](https://vuepress.vuejs.org/)

**Pros**:

-   Built with VueJS and I have good experience with JavaScript and quite familiar with Vue
-   Supports Markdown and Front Matter
-   Supports custom pages, themes, SEO, search and is statically generated
-   Is OSS and has a vibrant community
-   Can be hosted on GitHub

**Cons**:

-   Doesn't support Liquid tags
-   Doesn't have plugins. The built-in options are enough for my requirements at the moment though
-   Not geared towards blogging, but it's possible to do it easily with some hacking

### [Gatsby](https://www.gatsbyjs.org)

Pros:

-   Built with React and I have good experience with React
-   Supports Markdown and Front Matter
-   Supports custom pages, themes, plugins and is statically generated
-   Is OSS and has a vibrant community
-   Can be hosted on GitHub

**Cons**:

-   Doesn't support Liquid tags

### [WordPress](https://wordpress.org/)

**Pros**:

-   Have used it in the past and is a battle-tested solution
-   Supports Markdown using plugins
-   Supports custom pages, themes, plugins and can be statically generated using plugins
-   Is OSS and has a vibrant community
-   Can be hosted on GitHub with some workarounds

**Cons**:

-   Doesn't support Front Matter and Liquid tags
-   Since most of my core requirements can only be achieved using plugins and workarounds it feels too clumsy

Though I personally liked Hugo because of its speed, based on the above the most logical choice for me was **Jekyll**.

## Building a personal website and blog with Jekyll

### Getting started

Setting up Jekyll is super easy, I followed the official guide and had a site up and running in minutes. The steps in order were as below

1. Install a full [Ruby development environment](https://jekyllrb.com/docs/installation/)
2. Install Jekyll and bundler gems for my user - `gem install jekyll bundler --user-install`
3. Create a new site - `jekyll new DeepuKSasidharan --skip-bundle`, skipped the bundle install as I want to install to a vendor folder
4. Cd into the folder `DeepuKSasidharan` and install gems to a vendor folder - `bundle install --path vendor/bundle --full-index`
5. Start server - `bundle exec jekyll serve` and go to [http://localhost:4000](http://localhost:4000)

### Using a Theme

Up next was setting up a custom theme, since I really like the minimal design of Medium, I decided to use [Mediumish Jekyll Theme ](https://github.com/wowthemesnet/mediumish-theme-jekyll) so I did the below steps to switch to this. Steps 3-5 above can be skipped and instead step 2 from the below can be done directly as well.

1. Delete the folder `DeepuKSasidharan` we created above
2. Clone the theme to this folder - `git clone https://github.com/wowthemesnet/mediumish-theme-jekyll.git DeepuKSasidharan`
3. Cd into the folder `DeepuKSasidharan` and install gems to a vendor folder - `bundle install --path vendor/bundle --full-index`
4. Customize the `_config.yaml` file with my own user details, Google Analytics, Disqus ID and so on
    1. I had to update the `exclude` section to add `vendor/` to it and to `.gitignore` as well
    2. Updated the `jekyll-paginate` plugin to `jekyll-paginate-v2` in the `plugins` section
    3. Commented out the `baseurl` section
5. Start server - `bundle exec jekyll serve` and go to [http://localhost:4000](http://localhost:4000)

### Customizations

So now I had a good looking website with an about page and blog up and running. I customized the look and feel a bit and [changed](https://github.com/deepu105/deepu105.github.io/commit/9c6cb31f9b0c5643f350f3d9e685f37e3a3eed6d) the default page from **blogs** to **about**. You can check the source code at [deepu105/deepu105.github.io](https://github.com/deepu105/deepu105.github.io)

Now the next challenge was to make sure I can author once and post to both my blog and Dev.to, this means I have to make sure the front matter supported by Dev.to also works on my blog and any custom Liquid tags from Dev I use in the blog needs to work on my site as well.

The first part was easy, I just had to customize my sites includes and layouts to use `cover_image` instead of `image` and use the `tag: []` syntax for tags.

I also added support for Dev.to like [series](https://github.com/deepu105/deepu105.github.io/commit/1afe488da43e8588b2b8c02648229a08f8e93e0e) and [read time](https://github.com/deepu105/deepu105.github.io/commit/4e06234c30b61569b0e859d0136f92437eca49c4) with a custom ruby plugin.

### Adding custom liquid tags

In order to use Dev.to tags, first I tried if I can reuse them from Dev since its OSS, but it seems like they are heavily coupled with Rails and internal models to be extracted into Gems. I created a [ticket](https://github.com/thepracticaldev/dev.to/issues/3491) hoping this would happen eventually.

So decided to write my own Liquid tags in Ruby. I reused available OSS Liquid tags and customized them to work like the Dev.to ones in syntax and feature. I ended up creating the `codesandbox`, `twitter`, `gist`, `link`, `speakerdeck` and `youtube` tags. You can find them [here](https://github.com/deepu105/deepu105.github.io/tree/site_src/_plugins). Probably will add more as I use them. This is not scalable and I would love to see the Dev.to tags published as Ruby gems.

For example, here is a simple stub for the `youtube` tag.

```ruby
module Jekyll
     # A simple stub for the Dev.to youtube tag
    class YoutubeTag < Liquid::Tag

      def initialize(name, id, tokens)
        super
        @id = id
      end

      def render(context)
        %(<p>
            <div class="embed-video-container">
                <iframe width="710" height="399" src="https://www.youtube.com/embed/#{@id}" allowfullscreen></iframe>
            </div>
        </p>)
      end
    end
  end

  Liquid::Template.register_tag('youtube', Jekyll::YoutubeTag)

```

### Publishing to GitHub

Now that I have a site up and running with markdown posts that work in both my blog and Dev.to without having to make any adjustments, I decided to publish this to my Github accounts Github pages.

But there was an issue here. Github doesn't allow running any custom Ruby code on GitHub pages, so I can't just push to GitHub and get the site built and published so I decided to write a simple script to do the site generation on my machine from the source branch and push it to the master branch on GitHub.

```bash
#!/bin/bash

rm -rf _site

if [ -z "$(git status --porcelain)" ]; then
    echo ">>> Working directory clean"
    TMP_LOC=/tmp/deepu.github.io

    /bin/rm -rf _site || exit
    /bin/rm -rf $TMP_LOC || exit

    echo ">> Publish to Dev.to and update slugs"
    npm run publish-to-dev || exit
    git add --all || exit
    git commit --allow-empty -am "Updated posts with Dev.to slug" || exit

    echo ">> Building site"
    bundle update listen || exit
    bundle exec jekyll build || exit


    echo ">> Move site to temp folder"
    mkdir --parents $TMP_LOC || exit
    mv _site/* $TMP_LOC || exit

    echo ">> Checkout and clean master"
    git checkout master || exit
    find -mindepth 1 -depth -print0 | grep -vEzZ '(_drafts(/|$)|node_modules(/|$)|temp(/|$)|vendor(/|$)|\.git(/|$)|/\.gitignore$)' | xargs -0 rm -rvf || exit

    echo ">> Move site form temp & publish to GitHub"
    mv $TMP_LOC/* . || exit
    now=$(date)
    git add --all || exit
    git commit -am "Updated site on $now" || exit
    git push origin master --force || exit

    echo ">> $now: Published changes to GitHub"

    git checkout site_src
else
    echo ">> Working directory is not clean. Commit changes!"
    exit
fi
```

## My current workflow

I also wrote a small script to automatically publish or update posts to Dev.to as well using their API. [Here](https://github.com/deeputech/deeputech.github.io/blob/site_src/publish-to-dev.js) is the script.

So now that I have things in place, I author posts as markdown with a full front matter like below and publish on my blog and the script automatically cross-post the same to Dev.to as well.

```
---
title: "Static Site Generators rundown - How I set up my own blog with Jekyll"
published: false
description: Static Site Generators comparison
tags: [showdev, ruby, Jekyll, blogging]
cover_image:
canonical_url: https://deepu.tech/setting-up-a-blog-with-jekyll/
---
```

I'm not using the RSS import option in Dev as it uses the rendered blog and hence might need adjustments. I also set the `canonical_url` to my blog site.

When I update a post the same script above takes care of updating it on my site and Dev.to as well so both are always kept in sync.

## Future plans

There are some things that can be improved.

1. Use the Dev.to API to publish this direct from my publish script when I author a new post or make updates to an existing one. **Update: This is done**
2. Improve the link tag and add some more tags for GitHub. **Update: This is partially done**
3. Use local assets image for my own blog and generate the image URL for Dev.to when publishing.
4. Currently, all links point to Dev.to, make the link tag smart enough to point to my blog when published to my site(I don't want my readers to switch between sites). This might be a bit hard since Dev.to links have a random suffix. **Update: This is done**

---

So what do you think? If you have any suggestions on improvements or questions leave a comment.

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

---

Cover image credit: Photo by [Patrick Fore](https://unsplash.com/@patrickian4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/typewriter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
