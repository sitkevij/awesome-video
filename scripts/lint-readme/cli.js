#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { lintReadmeContent, lintUrlFormats } from "./index.js";

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  let readmePath = "README.md";
  let mode = "readme";

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--check-links") {
      mode = "links";
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }
    readmePath = arg;
  }

  return { readmePath: resolve(readmePath), mode };
}

function printHelp() {
  console.log(`Usage: lint-readme [options] [readme-path]

Lint README.md for awesome-list formatting rules.

Options:
  --check-links   Validate http(s) URL format only (no network requests)
  -h, --help      Show this help message

Environment:
  README          Default readme path when no positional argument is given
`);
}

const envReadme = process.env.README;
const { readmePath, mode } = parseArgs(
  process.argv.slice(2).length > 0
    ? process.argv.slice(2)
    : envReadme
      ? [envReadme]
      : [],
);

if (!existsSync(readmePath)) {
  console.error(`ERROR: ${readmePath} not found`);
  process.exit(1);
}

const content = readFileSync(readmePath, "utf8");
const reporter =
  mode === "links"
    ? lintUrlFormats(content, { readmePath })
    : lintReadmeContent(content, { readmePath });

process.exit(reporter.exitCode());
