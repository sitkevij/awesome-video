import { Reporter } from "../reporter.js";

/**
 * @param {ReturnType<import("../parse.js").readLines>} lines
 */
function extractDuplicateEntries(lines) {
  return lines
    .filter((line) => /^\s*- \[/.test(line.text) && !line.text.includes("#"))
    .map((line) => {
      const nameMatch = line.text.match(/\[([^\]]+)\]/);
      const urlMatch = line.text.match(/\((https?:\/\/[^)]+)\)/);
      return {
        lineNumber: line.lineNumber,
        name: nameMatch?.[1]?.toLowerCase() ?? "",
        url: urlMatch?.[1] ?? "",
      };
    })
    .filter((entry) => entry.name);
}

/**
 * @param {Reporter} reporter
 * @param {ReturnType<import("../parse.js").readLines>} lines
 */
export function checkDuplicates(reporter, lines) {
  reporter.log("");
  reporter.log("Checking for duplicate entries...");

  const items = extractDuplicateEntries(lines);

  /** @type {Map<string, number[]>} */
  const names = new Map();
  /** @type {Map<string, number[]>} */
  const urls = new Map();

  for (const item of items) {
    const normalizedName = item.name.toLowerCase();
    const lines = names.get(normalizedName) ?? [];
    lines.push(item.lineNumber);
    names.set(normalizedName, lines);

    if (/^https?:\/\//.test(item.url)) {
      const urlLines = urls.get(item.url) ?? [];
      urlLines.push(item.lineNumber);
      urls.set(item.url, urlLines);
    }
  }

  const duplicateNames = [...names.entries()].filter(([, lines]) => lines.length > 1);
  if (duplicateNames.length > 0) {
    const details = [];
    for (const [name, lines] of duplicateNames) {
      details.push(`  Project: ${name}`);
      for (const lineNumber of lines) {
        details.push(`    Line ${lineNumber}`);
      }
    }
    reporter.error(
      "Duplicate project names found",
      "Remove duplicate entries with the same project name",
      details,
    );
  }

  const duplicateUrls = [...urls.entries()].filter(([, lines]) => lines.length > 1);
  if (duplicateUrls.length > 0) {
    const details = [];
    for (const [url, lines] of duplicateUrls) {
      details.push(`  URL: ${url}`);
      for (const lineNumber of lines) {
        details.push(`    Line ${lineNumber}`);
      }
    }
    reporter.error(
      "Duplicate URLs found",
      "Remove duplicate entries with the same URL",
      details,
    );
  }
}
