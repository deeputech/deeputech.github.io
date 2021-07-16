// @ts-nocheck
const axios = require("axios").default;
const fs = require("fs");
const editor = require("front-matter-editor");
const json2yaml = require("json2yaml");

const DEV_TO_API_URI = "https://dev.to/api/";
const DEV_TO_ARTICLES = "articles";
const HEADERS = {
  "Content-Type": "application/json",
  "api-key": process.env.DEV_API_KEY,
};

const axiosInstance = axios.create({
  baseURL: DEV_TO_API_URI,
  timeout: 10000,
  headers: HEADERS,
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getBlogUrl(filename) {
  return filename.replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}-/, "").replace(".md", "");
}

const POSTS_DIR = "_posts/";

async function processFiles() {
  try {
    const filenames = fs.readdirSync(POSTS_DIR);

    if (filenames.length == 0) {
      console.error(`No files found in path ${POSTS_DIR}`);
      process.exit(1);
    }

    for (const filename of filenames) {
      try {
        const parsedContent = editor.read(POSTS_DIR + filename);
        const frontMatter = parsedContent.matter.data;
        const note = `*Originally published at [deepu.tech](https://deepu.tech/${getBlogUrl(filename)}/)*.\n`;
        const body_markdown = `${json2yaml.stringify(frontMatter)}\n---\n${frontMatter.canonical_url && frontMatter.canonical_url.includes("deepu.tech") ? note : ""}\n${
          parsedContent.matter.content
        }`;

        if (frontMatter && (frontMatter.published || frontMatter.draft) && !frontMatter.skip_devto) {
          const payload = {
            article: { body_markdown },
          };
          let response;
          if (frontMatter.devto_url) {
            const endpoint = `${DEV_TO_ARTICLES}/${frontMatter.devto_id}`;
            // check if the post has changed
            response = await axiosInstance.get(endpoint);
            if (response && response.status === 200) {
              if (response.data.body_markdown !== body_markdown) {
                // content has changed update
                console.log("===================================");
                console.log(`Publish ${filename} to Dev.to`);
                console.log(`Updating post ${frontMatter.devto_url}`);
                console.log("===================================");
                response = await axiosInstance.put(endpoint, payload);
                if (response && response.status === 200) {
                  console.log(`Id: ${response.data.id}, URL: ${response.data.url}`);
                }
              } else {
                response = null;
              }
            }
          } else {
            console.log("===================================");
            console.log(`Publish ${filename} to Dev.to`);
            console.log(`Creating post ${frontMatter.title}`);
            console.log("===================================");
            response = await axiosInstance.post(DEV_TO_ARTICLES, payload);
            if (response && response.status === 201) {
              console.log(`Id: ${response.data.id}, URL: ${response.data.url}`);
              // update devto_url & devto_id in the original post
              console.log(`Update post on disk: ${frontMatter.title}`);
              parsedContent
                .data((data, matter) => {
                  data.devto_id = response.data.id;
                  data.devto_url = response.data.url;
                  matter.data = data;
                })
                .save(POSTS_DIR, null, (err) => {
                  if (err) {
                    console.error(err);
                    process.exit(1);
                  } else {
                    console.log(`File ${filename} updated`);
                  }
                });
            }
          }
          if (response) {
            console.log(`Status: ${response.status} ${response.statusText}`);
            await sleep(2000); // to avoid hitting rate limit errors
          }
        }
      } catch (err) {
        console.error(`Failed: ${err.message}, details: ${err.response && err.response.data ? err.response.data.error : ""}`);
        process.exit(1);
      }
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

processFiles();
