// Shared CDP helpers for the talk scripts. They reuse the browser skill's
// connection (~/.claude/skills/browser), so BROWSER_PORT and --profile work the same.

import os from "node:os";

const { connect, browserURL } = await import(`${os.homedir()}/.claude/skills/browser/lib.js`);
export { connect };

// Only tabs from /json/list: with the --profile relay that is the tabs the agent
// opened, so the scripts never act on the user's other tabs.
export async function pickTab(b, urlPart) {
	const list = await fetch(`${browserURL}/json/list`).then((r) => r.json());
	const ids = list.filter((t) => t.type === "page" && t.url.includes(urlPart)).map((t) => t.id);
	const page = (await b.pages()).find((p) => ids.includes(p.target()._targetId));
	if (!page) {
		console.error(`✗ No tab with "${urlPart}" in its URL. Open one: browser-nav.js <url> --new`);
		process.exit(1);
	}
	return page;
}
