module Jekyll
  @@metadataCache = {}

  def self.setMetadataCache(value)
    @@metadataCache = value
  end

  def self.metadataCache
    @@metadataCache
  end

  Jekyll::Hooks.register :site, :pre_render do |site|
    puts "Replace post links based on context"
    url_map = {}
    fm_map = {}
    site.posts.docs.each { |post|
      blog_url = "https://deepu.tech/#{post.data["slug"]}/"
      if post.data && post.data["devto_url"]
        url_map[post.data["devto_url"]] = blog_url
      end
      fm_map[post.data["slug"]] = post.data
    }

    Jekyll.setMetadataCache(fm_map)

    site.posts.docs.each { |post|
      url_map.each { |key, val|
        post.content = post.content.gsub(key, val)
      }
      #  Add a note at end of all posts
      # if post.data && post.data['devto_url']
      #     post.content = post.content.concat("\n*Also published at [Dev.to](#{post.data['devto_url']})*")
      # end
    }
  end
end
