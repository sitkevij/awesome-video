#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { sortReadmeLinks, insertReadmeLink } from "./sort-links.js";

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  let readmePath = "README.md";
  let mode = "sort";
  /** @type {string | undefined} */
  let addEntry;
  /** @type {string | undefined} */
  let sectionName;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--write") {
      mode = "write";
      continue;
    }
    if (arg === "--check") {
      mode = "check";
      continue;
    }
    if (arg === "--section") {
      sectionName = argv[index + 1];
      if (!sectionName) {
        console.error("ERROR: --section requires a section name");
        process.exit(1);
      }
      index += 1;
      continue;
    }
    if (arg === "--add") {
      addEntry = argv[index + 1];
      if (!addEntry) {
        console.error("ERROR: --add requires an entry argument");
        process.exit(1);
      }
      mode = "add";
      index += 1;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }
    readmePath = arg;
  }

  return { readmePath: resolve(readmePath), mode, addEntry, sectionName };
}

function printHelp() {
  console.log(`Usage: sort-readme-links [options] [readme-path]

Sort awesome-list entries alphabetically within each README section.

Options:
  --check         Exit 1 when sorting would change the file (dry run)
  --write         Write sorted README back to disk
  --add <entry>   Insert a new '- [name](url) - description.' line in sorted order
  --section <n>   Section heading to target when using --add (required with --add)
  -h, --help      Show this help message

Examples:
  node scripts/lint-readme/sort-cli.js --check
  node scripts/lint-readme/sort-cli.js --write
  node scripts/lint-readme/sort-cli.js --add "- [demo](https://example.com) - Short description." --section Players
`);
}

const { readmePath, mode, addEntry, sectionName } = parseArgs(process.argv.slice(2));

if (!existsSync(readmePath)) {
  console.error(`ERROR: ${readmePath} not found`);
  process.exit(1);
}

const original = readFileSync(readmePath, "utf8");

if (mode === "add") {
  if (!sectionName) {
    console.error("ERROR: --section is required with --add");
    process.exit(1);
  }

  try {
    const { content, position } = insertReadmeLink(original, addEntry, {
      section: sectionName,
    });
    writeFileSync(readmePath, content, "utf8");
    const sectionLabel = position.section ? `'${position.section}'` : "end of file";
    console.log(`Inserted entry at line ${position.lineNumber} in section ${sectionLabel}`);
    process.exit(0);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`ERROR: ${message}`);
    process.exit(1);
  }
}

const { content, changed, sections } = sortReadmeLinks(original);

if (!changed) {
  console.log(`✓ ${readmePath} is already sorted`);
  process.exit(0);
}

if (mode === "check") {
  console.log(`✗ ${readmePath} is not sorted`);
  for (const section of sections) {
    const label = section.section ? `'${section.section}'` : "unknown section";
    console.log(`  Section ${label}: ${section.lines.length} entr${section.lines.length === 1 ? "y" : "ies"} need reordering`);
  }
  process.exit(1);
}

if (mode === "write") {
  writeFileSync(readmePath, content, "utf8");
  console.log(`✓ Sorted ${sections.length} section(s) in ${readmePath}`);
  process.exit(0);
}

process.stdout.write(content);
