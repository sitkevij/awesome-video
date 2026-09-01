import { Reporter } from "../reporter.js";
import { parseListItems } from "../parse.js";
import { validateListItemUrlPolicy } from "../url-format.js";

/**
 * @param {Reporter} reporter
 * @param {ReturnType<typeof parseListItems>} items
 */
export function checkInvalidListUrls(reporter, items) {
  reporter.log("");
  reporter.log("Checking for invalid URLs...");

  /** @type {string[]} */
  const details = [];
  let reportedHeader = false;

  for (const item of items) {
    const reason = validateListItemUrlPolicy(item.url);
    if (!reason) {
      continue;
    }

    if (!reportedHeader) {
      if (reason.includes("private IP")) {
        reporter.error(
          "Invalid URLs found",
          "Replace private IP addresses with proper public URLs",
        );
      } else if (reason.includes("IP address")) {
        reporter.error(
          "Invalid URLs found",
          "Replace IP addresses with proper domain URLs",
        );
      } else if (reason.startsWith("file://")) {
        reporter.error(
          "Invalid URLs found",
          "Replace file:// URLs with proper public URLs",
        );
      } else {
        reporter.error(
          "Invalid URLs found",
          "Replace localhost URLs with proper public URLs",
        );
      }
      reportedHeader = true;
    }

    details.push(`  Line ${item.lineNumber}: ${reason} - ${item.url}`);
  }

  for (const detail of details) {
    reporter.log(detail);
  }

  if (details.length === 0) {
    reporter.log("  No invalid URLs found.");
  }
}
