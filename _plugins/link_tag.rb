module Jekyll
  DEEPUTECH = "https://deepu.tech/"
  # A simple stub for the Dev.to link tag
  class LinkTag < Liquid::Tag
    def initialize(_tag_name, url, _tokens)
        @article = url.strip
        if @article.start_with?(DEEPUTECH)
            cache = Jekyll.metadataCache
            key = @article.gsub(DEEPUTECH, "").gsub("/", "").strip
            @meta = cache[key]
        end
    end

    def render(_context)
        title = @article
        if @meta && @meta['title']
            title = @meta['title']
            %(<div class="link-container">
                <a href='#{@article}'>
                    <div class="ltag__link__content">
                        <h3>#{title}</h3>
                        <p>#{@meta['date'].strftime('%d-%b-%Y')}</p>
                        <div class="ltag__link__taglist">
                            #{@meta['tags'].map {|tag|
                                '#' + tag
                            }.join(' ')}
                        </div>
                    </div>
                </a>
            </div>)
        else
            %(<div class="link-container">
                <a href='#{@article}'>#{title}</a>
            </div>)
        end
    end
  end
end

  Liquid::Template.register_tag("link", Jekyll::LinkTag)
