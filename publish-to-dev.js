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
                const body_markdown = parsedContent.matter.orig;
                if (frontMatter && frontMatter.published) {
                    console.log("===================================");
                    console.log(`Publish ${filename} to Dev.to`);
                    console.log("===================================");
                    const payload = {
                        article: { body_markdown }
                    };
                    let response;
                    if (frontMatter.devto_url) {
                        console.log(`Update post ${frontMatter.devto_url}`);
                        response = await axiosInstance.put(
                            `${DEV_TO_ARTICLES}/${frontMatter.devto_id}`,
                            payload
                        );
                    } else {
                        console.log(`Create post ${frontMatter.titlel}`);
                        response = await axiosInstance.post(
                            DEV_TO_ARTICLES,
                            payload
                        );
                        if (response) {
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
                    if (response) {
                        console.log(
                            `Success: ${response.status} ${response.statusText}`
                        );
                        console.log(
                            `Id: ${response.data.id}, URL: ${response.data.url}`
                        );
                    }
                    await sleep(2000);
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
