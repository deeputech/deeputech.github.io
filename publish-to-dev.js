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
    timeout: 2000,
    headers: HEADERS
});

async function postContentToDevTo(payload, id) {
    try {
        if (id) {
            // update the post if its already present
            return await axiosInstance.put(`${DEV_TO_ARTICLES}/${id}`, payload);
        }
        // create the post if it doesn't exist
        return await axiosInstance.post(DEV_TO_ARTICLES, payload);
    } catch (error) {
        console.error(
            `Failed: ${error.message}, details: ${
                error.response && error.response.data
                    ? error.response.data.error
                    : ""
            }`
        );
        process.exit(1);
    }
}

const POSTS_DIR = "_posts/";

const filenames = fs.readdirSync(POSTS_DIR);

if (filenames.length == 0) {
    console.error(`No files found in path ${POSTS_DIR}`);
    process.exit(1);
}

filenames.forEach(async filename => {
    const parsedContent = editor.read(filename);
    const frontMatter = parsedContent.matter.data;
    const body_markdown = parsedContent.matter.orig;
    if (frontMatter && frontMatter.published) {
        console.log("===================================");
        console.log(`Publish ${filename} to Dev.to: ${frontMatter.title}`);
        console.log("===================================");
        const payload = {
            article: { body_markdown }
        };
        let response;
        if (frontMatter.devto_url) {
            response = await postContentToDevTo(payload, frontMatter.devto_id);
        } else {
            response = await postContentToDevTo(payload);
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
            console.log(`Success: ${response.status} ${response.statusText}`);
            console.log(`Id: ${response.data.id}, URL: ${response.data.url}`);
        }
    }
});
