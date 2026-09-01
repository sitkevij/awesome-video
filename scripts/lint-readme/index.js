import { Reporter } from "./reporter.js";
import { extractHttpUrls, parseListItems, readLines } from "./parse.js";
import { validateUrlFormat } from "./url-format.js";
import { checkTrailingWhitespace, checkListItemFormat } from "./checks/list-format.js";
import { checkDuplicates } from "./checks/duplicates.js";
import { checkInvalidListUrls } from "./checks/invalid-urls.js";
import { checkAlphabeticalOrder } from "./checks/alphabetical.js";

/**
 * @typedef {{ readmePath?: string, content?: string, silent?: boolean }} LintReadmeOptions
 */

/**
 * Lint README content for awesome-list formatting rules.
 *
 * @param {string} content
 * @param {Omit<LintReadmeOptions, "content">} [options]
 * @returns {Reporter}
 */
export function lintReadmeContent(content, options = {}) {
  const reporter = new Reporter({ quiet: options.silent });
  const lines = readLines(content);
  const items = parseListItems(lines);

  if (!options.silent) {
    const readmePath = options.readmePath ?? "README.md";
    reporter.log(`Linting ${readmePath}...`);
    reporter.log("");
  }

  checkTrailingWhitespace(reporter, lines);
  checkListItemFormat(reporter, lines);
  checkDuplicates(reporter, lines);
  checkInvalidListUrls(reporter, items);
  checkAlphabeticalOrder(reporter, lines);

  if (!options.silent) {
    reporter.printSummary();
  }

  return reporter;
}

/**
 * Validate every http(s) URL in README content (no network requests).
 *
 * @param {string} content
 * @param {{ readmePath?: string, silent?: boolean }} [options]
 * @returns {Reporter}
 */
export function lintUrlFormats(content, options = {}) {
  const reporter = new Reporter({ quiet: options.silent });
  const readmePath = options.readmePath ?? "README.md";
  const urls = extractHttpUrls(content);

  if (!options.silent) {
    reporter.log(`Checking URL format in ${readmePath} (no network requests)...`);
    reporter.log("");
  }

  if (urls.length === 0) {
    reporter.log("No URLs found.");
    return reporter;
  }

  for (const url of urls) {
    const issue = validateUrlFormat(url);
    if (issue === "URL contains whitespace") {
      reporter.error(
        `URL contains whitespace: ${url}`,
        "Remove spaces from the URL",
      );
      continue;
    }

    if (issue) {
      reporter.error(`Malformed URL: ${url}`, "Use a well-formed http:// or https:// URL");
    }
  }

  if (!options.silent) {
    reporter.log("");
    if (reporter.errorCount === 0) {
      reporter.log(`✓ All ${urls.length} URL(s) have valid format`);
    } else {
      reporter.log(`✗ Found ${reporter.errorCount} URL format error(s)`);
    }
  }

  return reporter;
}

export { Reporter } from "./reporter.js";
export { sortReadmeLinks, insertReadmeLink, findInsertPosition } from "./sort-links.js";
