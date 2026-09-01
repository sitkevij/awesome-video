import { Reporter } from "../reporter.js";
import { readLines } from "../parse.js";

const LIST_ITEM_FORMAT_RE = /^\s*- \[[^\]]+\]\([^)]+\) - .+/;
const LINK_RE = /\[[^\]]+\]\([^)]+\)/;
const SEPARATOR_RE = /\) - /;

/**
 * @param {Reporter} reporter
 * @param {ReturnType<typeof readLines>} lines
 */
export function checkTrailingWhitespace(reporter, lines) {
  const hasTrailingWhitespace = lines.some(
    (line) => line.text !== line.trimmed && /\s$/.test(line.text),
  );

  if (hasTrailingWhitespace) {
    reporter.error(
      "End-of-line whitespace detected.",
      "Remove spaces at end of lines. Link lines should end in period (.) followed by newline only.",
    );
  }
}

/**
 * @param {Reporter} reporter
 * @param {ReturnType<typeof readLines>} lines
 */
export function checkListItemFormat(reporter, lines) {
  const listLines = lines.filter(
    (line) => /^\s*- \[/.test(line.text) && !line.text.includes("#"),
  );

  if (listLines.length === 0) {
    reporter.log("No list items found to check.");
    return;
  }

  for (const line of listLines) {
    const content = line.text;

    if (!LIST_ITEM_FORMAT_RE.test(content)) {
      reporter.error(
        `Line ${line.lineNumber}: List item doesn't match format '- [name](url) - description'`,
        "Ensure format is: - [name](url) - description",
        [`  Found: ${content}`],
      );
      continue;
    }

    const description = content.replace(/^[^-]+- /, "");
    if (!description) {
      reporter.error(
        `Line ${line.lineNumber}: List item has no description`,
        "Add a description after the link",
        [`  Found: ${content}`],
      );
      continue;
    }

    const lastChar = description.at(-1) ?? "";
    if (!/[.!?]/.test(lastChar)) {
      reporter.error(
        `Line ${line.lineNumber}: Description doesn't end with punctuation (. ! ?)`,
        "Add proper punctuation at the end of the description",
        [`  Found: ${description}`],
      );
    }

    if (!LINK_RE.test(content)) {
      reporter.error(
        `Line ${line.lineNumber}: Link format is incorrect`,
        "Use format [name](url)",
        [`  Found: ${content}`],
      );
    }

    if (!SEPARATOR_RE.test(content)) {
      reporter.error(
        `Line ${line.lineNumber}: Missing ' - ' separator between link and description`,
        "Add ' - ' (space-dash-space) between link and description",
        [`  Found: ${content}`],
      );
    }
  }
}
