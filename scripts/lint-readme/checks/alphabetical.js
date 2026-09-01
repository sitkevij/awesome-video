import { Reporter } from "../reporter.js";
import { iterateSectionEntries } from "../parse.js";

/**
 * @param {Reporter} reporter
 * @param {ReturnType<typeof readLines>} lines
 */
export function checkAlphabeticalOrder(reporter, lines) {
  reporter.log("");
  reporter.log("Checking alphabetical order...");

  /** @type {string | null} */
  let previousName = null;
  /** @type {string | undefined} */
  let currentSection;
  /** @type {string[]} */
  const details = [];
  let reportedHeader = false;

  for (const entry of iterateSectionEntries(lines)) {
    if (entry.section !== currentSection) {
      currentSection = entry.section;
      previousName = null;
    }

    if (previousName !== null && previousName.localeCompare(entry.name) > 0) {
      if (!reportedHeader) {
        reporter.warn(
          "Entries not in alphabetical order",
          "Sort entries alphabetically within each section",
        );
        reportedHeader = true;
      }
      details.push(
        `  Section '${currentSection}': '${previousName}' should come after '${entry.displayName}'`,
      );
    }

    previousName = entry.name;
  }

  for (const detail of details) {
    reporter.log(detail);
  }

  if (details.length === 0) {
    reporter.log("  All sections are alphabetically sorted.");
  }
}
