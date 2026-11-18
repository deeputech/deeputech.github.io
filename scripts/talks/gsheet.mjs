#!/usr/bin/env node
// Read or write rows in the Google Sheet open in a browser tab, as the logged-in user.
//
// usage:
//   node scripts/talks/gsheet.mjs read <range>             e.g. A80:O95, prints CSV
//   node scripts/talks/gsheet.mjs write <cell> <rows.json>  rows.json: [["a","b"],["c"]]
//   node scripts/talks/gsheet.mjs insert-rows <row> <count>  empty rows above <row>
// write types each row from <cell> to the right, then reads the rows back and diffs them.
// It refuses to write when a target cell is not empty. Uses the sheet tab (gid) in the URL.
// gviz CSV leaves out empty rows and hidden rows, so `read` output can skip row numbers.
// write and insert-rows refuse hidden rows, because the empty check cannot see them.

import fs from "node:fs";
import { connect, pickTab } from "./lib.mjs";

const [cmd, arg, rowsFile] = process.argv.slice(2);
if (!["read", "write", "insert-rows"].includes(cmd) || !arg || (cmd !== "read" && !rowsFile)) {
	console.error("usage: gsheet.mjs read <range> | write <cell> <rows.json> | insert-rows <row> <count>");
	process.exit(1);
}

const b = await connect();
const page = await pickTab(b, "docs.google.com/spreadsheets/d/");
const [, sheetId] = page.url().match(/\/spreadsheets\/d\/([\w-]+)/);
const gid = page.url().match(/gid=(\d+)/)?.[1] ?? "0";

const read = (range) =>
	page.evaluate(
		(u) => fetch(u, { credentials: "include" }).then((r) => (r.ok ? r.text() : Promise.reject(new Error(`HTTP ${r.status}`)))),
		`/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&headers=0&gid=${gid}&range=${range}`,
	);

// shortcut: simple CSV parse (quoted fields, no embedded newlines), fine for gviz output.
const parse = (csv) =>
	csv.trim() === "" ? [] : csv.trim().split("\n").map((l) => [...l.matchAll(/"((?:[^"]|"")*)"/g)].map((m) => m[1].replace(/""/g, '"')));

const goTo = async (ref) => {
	await page.click("#t-name-box", { clickCount: 3 });
	await page.keyboard.type(ref);
	await page.keyboard.press("Enter");
	await new Promise((res) => setTimeout(res, 400));
};

// A hidden row makes the name box jump to the next visible row.
const assertVisible = async (c, rows) => {
	for (const row of rows) {
		await goTo(`${c}${row}`);
		const at = await page.$eval("#t-name-box", (e) => e.value);
		if (at !== `${c}${row}`) {
			console.error(`✗ Row ${row} is hidden (name box went to ${at}). Unhide it or pick other rows.`);
			process.exit(1);
		}
	}
};

const col = (n) => (n > 26 ? col(Math.floor((n - 1) / 26)) : "") + String.fromCharCode(65 + ((n - 1) % 26));

if (cmd === "read") {
	console.log(await read(arg));
} else if (cmd === "insert-rows") {
	const [row, n] = [+arg, +rowsFile];
	await page.bringToFront();
	await assertVisible("A", [row, row + 1]);
	const before = await read(`A${row}:Z${row}`);
	await goTo(`${row}:${row + n - 1}`);
	// Sheets shortcut: insert rows above the selected rows.
	for (const x of ["Control", "Alt", "Shift", "Equal"]) await page.keyboard.down(x);
	for (const x of ["Equal", "Shift", "Alt", "Control"]) await page.keyboard.up(x);
	await new Promise((res) => setTimeout(res, 1500));
	const moved = (await read(`A${row + n}:Z${row + n}`)) === before;
	const empty = parse(await read(`A${row}:Z${row + n - 1}`)).length === 0;
	console.log(moved && empty ? `✓ ${n} empty rows above old row ${row}` : `✗ insert did not work (moved=${moved}, empty=${empty}). Check the sheet, Ctrl+Z undoes it.`);
	if (!(moved && empty)) process.exitCode = 1;
} else {
	const rows = JSON.parse(fs.readFileSync(rowsFile, "utf8"));
	const [, c, r] = arg.toUpperCase().match(/^([A-Z]+)(\d+)$/);
	const c0 = [...c].reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0);
	const width = Math.max(...rows.map((x) => x.length));
	const range = `${c}${r}:${col(c0 + width - 1)}${+r + rows.length - 1}`;

	await page.bringToFront();
	await assertVisible(c, rows.map((_, i) => +r + i));
	if (parse(await read(range)).flat().some((v) => v !== "")) {
		console.error(`✗ ${range} is not empty. Insert empty rows first, or pick another cell.`);
		process.exit(1);
	}

	const k = page.keyboard;
	for (const [i, row] of rows.entries()) {
		await goTo(`${c}${+r + i}`);
		for (const [j, v] of row.entries()) {
			if (v !== "") await k.type(String(v), { delay: 5 });
			await k.press(j < row.length - 1 ? "Tab" : "Enter");
		}
	}
	await new Promise((res) => setTimeout(res, 1500));

	const got = parse(await read(range));
	const diffs = rows.flatMap((row, i) =>
		row.map((v, j) => [`${col(c0 + j)}${+r + i}`, String(v), got[i]?.[j] ?? ""]).filter(([, want, have]) => want !== have),
	);
	for (const [cell, want, have] of diffs) console.log(`${cell}: wrote "${want}", reads "${have}"`);
	console.log(diffs.length ? `✗ ${diffs.length} cells differ (dates and numbers can show in another format)` : `✓ ${range} matches`);
}
await b.disconnect();
