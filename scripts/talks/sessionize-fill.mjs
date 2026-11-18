#!/usr/bin/env node
// Fill a Sessionize "submit session" form with one talk from talks/talk-tracker.md.
// It does not submit. Fill AI %, the consent box and click Submit yourself.
//
// usage: node scripts/talks/sessionize-fill.mjs <talk-id> <fields.json>
//   fields.json maps the form's field label to a value. Values can use {title},
//   {description}, {elevatorPitch} and {speakerPitch} from the talk. Select fields
//   take the option text, multi-selects an array of option texts. See README.md.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connect, pickTab } from "./lib.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const [talkId, fieldsFile] = process.argv.slice(2);
if (!talkId || !fieldsFile) {
	console.error("usage: sessionize-fill.mjs <talk-id> <fields.json>");
	process.exit(1);
}

// Talk sections look like "### T1: <title>" with "**Description:**" etc. under them.
function readTalk(id) {
	const md = fs.readFileSync(path.join(ROOT, "talks/talk-tracker.md"), "utf8");
	const sec = md.split(`\n### ${id}: `)[1]?.split(/\n### |\n---/)[0];
	if (!sec) throw new Error(`talk ${id} not found in talk-tracker.md`);
	const part = (name) => sec.split(`**${name}:**`)[1]?.split(/\n\*\*[^*]+:\*\*/)[0].trim();
	const talk = {
		title: sec.split("\n")[0].trim(),
		description: part("Description"),
		speakerPitch: part("Speaker Pitch"),
		elevatorPitch: part("Elevator Pitch"),
	};
	for (const [k, v] of Object.entries(talk)) if (!v) throw new Error(`talk ${id}: empty ${k}`);
	return talk;
}

const talk = readTalk(talkId);
const fill = (v) => (Array.isArray(v) ? v : v.replace(/\{(\w+)\}/g, (m, k) => talk[k] ?? m));
const fields = Object.fromEntries(Object.entries(JSON.parse(fs.readFileSync(fieldsFile, "utf8"))).map(([k, v]) => [k, fill(v)]));

const b = await connect();
const page = await pickTab(b, "sessionize.com");
const result = await page.evaluate((fields) => {
	const labelFor = (text) =>
		[...document.querySelectorAll("label")].find((l) => l.innerText.replace(/\s*\*$/, "").trim() === text);
	const out = {};
	for (const [label, value] of Object.entries(fields)) {
		const l = labelFor(label);
		const el = l && (l.htmlFor ? document.getElementById(l.htmlFor) : l.querySelector("input, textarea"));
		if (!el) {
			out[label] = "NOT FOUND";
			continue;
		}
		// Selectize hides the real <select> and labels its own "<id>-selectized" input.
		const sel = document.getElementById(el.id.replace(/-selectized$/, ""))?.selectize;
		if (sel) {
			const byText = Object.values(sel.options);
			const ids = [].concat(value).map((t) => byText.find((o) => o[sel.settings.labelField] === t)?.[sel.settings.valueField]);
			if (ids.includes(undefined)) {
				out[label] = `UNKNOWN OPTION, have: ${byText.map((o) => o[sel.settings.labelField]).join(" | ")}`;
				continue;
			}
			sel.setValue(Array.isArray(value) ? ids : ids[0]);
			const got = [].concat(sel.getValue()).map((v) => sel.options[v][sel.settings.labelField]);
			out[label] = JSON.stringify(got) === JSON.stringify([].concat(value)) ? "ok" : `MISMATCH: ${got.join(", ")}`;
			continue;
		}
		const proto = el.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
		Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);
		for (const e of ["input", "change", "blur"]) el.dispatchEvent(new Event(e, { bubbles: true }));
		out[label] = el.value === value ? `ok (${value.length} chars)` : "MISMATCH";
	}
	return out;
}, fields);
await b.disconnect();

console.log(JSON.stringify(result, null, 1));
if (Object.values(result).some((v) => !v.startsWith("ok"))) process.exit(1);
