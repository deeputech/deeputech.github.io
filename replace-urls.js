// @ts-nocheck
const fs = require("fs");
const editor = require("front-matter-editor");

const POSTS_DIR = "_posts/";

async function processFiles() {
  try {
    const urlMap = {};
    const filenames = fs.readdirSync(POSTS_DIR);

    if (filenames.length == 0) {
      console.error(`No files found in path ${POSTS_DIR}`);
      process.exit(1);
    }

    for (const filename of filenames) {
      try {
        const parsedContent = editor.read(POSTS_DIR + filename);
        const frontMatter = parsedContent.matter.data;
        urlMap[frontMatter.devto_url] = frontMatter.canonical_url;
      } catch (err) {
        console.error(`Failed: ${err.message}, details: ${err.response && err.response.data ? err.response.data.error : ""}`);
        process.exit(1);
      }
    }

    for (const filename of filenames) {
      try {
        fs.readFile(POSTS_DIR + filename, "utf-8", function (err, data) {
          if (err) throw err;

          let out = data;

          Object.entries(urlMap).forEach(([key, v]) => {
            const reg = new RegExp(`\\(${key}\\)`, "g");
            out = out.replace(reg, `(${v})`);
          });

          fs.writeFile(POSTS_DIR + filename, out, "utf-8", function (err, data) {
            if (err) throw err;
            console.log("Done!");
          });
        });
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
