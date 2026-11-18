# Talk scripts

Helpers for CFP work. They drive a tab in your Chrome through the browser skill
(`~/.claude/skills/browser`), with your logins. Talk text comes from
`talks/talk-tracker.md`.

## Setup

1. Open Chrome and turn on remote debugging at `chrome://inspect/#remote-debugging`.
2. Start the relay: `BROWSER_PORT=9333 browser-start.js --profile`, then click **Allow** in Chrome.
   Use port 9333, because Chrome itself takes 9222.
3. Open the page in a new tab: `BROWSER_PORT=9333 browser-nav.js <url> --new`.
   The scripts only see tabs that the relay opened.
4. Run the scripts with `BROWSER_PORT=9333`.

If Chrome runs on another machine (for example the XPS), start the relay there
and forward the port: `ssh -f -N -L 9333:127.0.0.1:9333 deepu-xps15-arch.local`.

When done, stop the relay: `fuser -k 9333/tcp` on the Chrome machine.

## sessionize-fill.mjs

Fills a Sessionize "submit session" form with one talk. It does not submit.

```sh
BROWSER_PORT=9333 node scripts/talks/sessionize-fill.mjs T1 fields.json
```

`fields.json` maps the field label to a value. `{title}`, `{description}`,
`{elevatorPitch}` and `{speakerPitch}` come from the talk. Selects take the
option text, multi-selects take an array. Example (Jfokus 2027):

```json
{
  "Session Title": "{title}",
  "Description": "{description}",
  "Session format": "Session (45 min)",
  "Level": "Introductory and overview",
  "Categories": ["Artificial Intelligence (AI)", "Tools"],
  "Message to program committee": "Elevator pitch:\n{elevatorPitch}\n\nWhy me:\n{speakerPitch}"
}
```

It prints `ok` for each field, or `NOT FOUND`, `MISMATCH` or the list of valid options.

## gsheet.mjs

Reads or writes rows in the Google Sheet in the open tab (the sheet tab from `gid=` in the URL).

```sh
BROWSER_PORT=9333 node scripts/talks/gsheet.mjs read A80:O95
BROWSER_PORT=9333 node scripts/talks/gsheet.mjs write A91 rows.json   # [["Event","8-Feb-2027"],["","x"]]
```

`write` refuses a range that is not empty or has hidden rows, types the rows, then reads them back and prints any cell that differs. `insert-rows <row> <count>` puts empty rows above `<row>`. `read` leaves out empty and hidden rows.
