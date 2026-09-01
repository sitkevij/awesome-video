/** @typedef {{ lineNumber: number, text: string, trimmed: string }} ReadmeLine */
/** @typedef {{ lineNumber: number, name: string, url: string, description: string, raw: string }} ListItem */

const LIST_ITEM_RE = /^\s*- \[([^\]]+)\]\(([^)]+)\) - (.+)$/;
const SECTION_RE = /^#{2,}\s+(.*)$/;
const SORTABLE_LIST_ITEM_RE = /^\s*- \[/;

/**
 * Awesome-list entries to sort (skips table-of-contents anchor links).
 *
 * @param {string} line
 * @returns {boolean}
 */
export function isSortableListItem(line) {
  return SORTABLE_LIST_ITEM_RE.test(line) && !line.includes("#");
}

/**
 * @param {string} line
 * @returns {string | null}
 */
export function extractListItemName(line) {
  const match = line.match(/^\s*- \[([^\]]+)\]/);
  return match?.[1] ?? null;
}

/**
 * Case-insensitive sort key used by the linter and sorter.
 *
 * @param {string} line
 * @returns {string}
 */
export function listItemSortKey(line) {
  return (extractListItemName(line) ?? "").toLowerCase();
}

/**
 * @param {string} left
 * @param {string} right
 * @returns {number}
 */
export function compareListItemLines(left, right) {
  return listItemSortKey(left).localeCompare(listItemSortKey(right));
}


/**
 * @param {string} content
 * @returns {ReadmeLine[]}
 */
export function readLines(content) {
  return content.split(/\r?\n/).map((text, index) => ({
    lineNumber: index + 1,
    text,
    trimmed: text.trimEnd(),
  }));
}

/**
 * List entries used for awesome-list validation (skips table-of-contents links).
 *
 * @param {ReadmeLine[]} lines
 * @returns {ListItem[]}
 */
export function parseListItems(lines) {
  /** @type {ListItem[]} */
  const items = [];

  for (const line of lines) {
    if (!/^\s*- \[/.test(line.text) || line.text.includes("#")) {
      continue;
    }

    const match = line.text.match(LIST_ITEM_RE);
    if (!match) {
      continue;
    }

    items.push({
      lineNumber: line.lineNumber,
      name: match[1],
      url: match[2],
      description: match[3],
      raw: line.text,
    });
  }

  return items;
}

/**
 * @param {ReadmeLine[]} lines
 * @returns {Generator<{ section: string, name: string, displayName: string, lineNumber: number }>}
 */
export function* iterateSectionEntries(lines) {
  let currentSection = "";

  for (const line of lines) {
    const sectionMatch = line.text.match(SECTION_RE);
    if (sectionMatch) {
      currentSection = sectionMatch[1];
      continue;
    }

    if (!/^- \[/.test(line.text) || line.text.includes("#")) {
      continue;
    }

    const nameMatch = line.text.match(/^- \[([^\]]+)\]/);
    if (!nameMatch) {
      continue;
    }

    yield {
      section: currentSection,
      name: nameMatch[1].toLowerCase(),
      displayName: nameMatch[1],
      lineNumber: line.lineNumber,
    };
  }
}

/**
 * @param {string} content
 * @returns {string[]}
 */
export function extractHttpUrls(content) {
  const matches = content.match(/https?:\/\/[^'"\s)<>]+/g) ?? [];
  return [...new Set(matches.map((url) => url.replace(/[.,;:!?]+$/, "")))];
}
