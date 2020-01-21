// @ts-nocheck
const axios = require("axios").default;
const fs = require("fs");
const editor = require("front-matter-editor");

const DEV_TO_API_URI = "https://dev.to/api/";
const DEV_TO_ARTICLES = "articles";
const HEADERS = {
    "Content-Type": "application/json",
    "api-key": process.env.DEV_API_KEY
};

const axiosInstance = axios.create({
    baseURL: DEV_TO_API_URI,
    timeout: 10000,
    headers: HEADERS
});

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
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
                const body_markdown =
                    parsedContent.matter.orig +
                    `\n*Also published on [my blog](${frontMatter.blog_url ||
                        frontMatter.canonical_url})*`;
                if (frontMatter && frontMatter.published) {
                    console.log("===================================");
                    console.log(`Publish ${filename} to Dev.to`);
                    console.log("===================================");
                    const payload = {
                        article: { body_markdown }
                    };
                    let response;
                    if (frontMatter.devto_url) {
                        const endpoint = `${DEV_TO_ARTICLES}/${frontMatter.devto_id}`;
                        // check if the post has changed
                        response = await axiosInstance.get(endpoint);
                        if (response && response.status === 200) {
                            if (response.data.body_markdown !== body_markdown) {
                                // content has changed update
                                console.log(
                                    `Updating post ${frontMatter.devto_url}`
                                );
                                response = await axiosInstance.put(
                                    endpoint,
                                    payload
                                );
                            } else {
                                response = null;
                            }
                        }
                    } else {
                        console.log(`Creating post ${frontMatter.titlel}`);
                        response = await axiosInstance.post(
                            DEV_TO_ARTICLES,
                            payload
                        );
                        if (response && response.status === 200) {
                            // update devto_url & devto_id in the original post
                            parsedContent
                                .data((data, matter) => {
                                    data.devto_id = response.data.id;
                                    data.devto_url = response.data.url;
                                    matter.data = data;
                                })
                                .save(POSTS_DIR, null, err => {
                                    if (err) {
                                        console.error(err);
                                        process.exit(1);
                                    } else {
                                        console.log(`File ${filename} updated`);
                                    }
                                });
                        }
                    }
                    if (response && response.status === 200) {
                        console.log(
                            `Success: ${response.status} ${response.statusText}`
                        );
                        console.log(
                            `Id: ${response.data.id}, URL: ${response.data.url}`
                        );
                        await sleep(2000); // to avoid hitting rate limit errors
                    }
                }
            } catch (err) {
                console.error(
                    `Failed: ${err.message}, details: ${
                        err.response && err.response.data
                            ? err.response.data.error
                            : ""
                    }`
                );
                process.exit(1);
            }
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

processFiles();
