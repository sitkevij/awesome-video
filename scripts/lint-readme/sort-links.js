import { compareListItemLines, isSortableListItem } from "./parse.js";

/**
 * @typedef {{ section: string | null, lines: string[] }} SortedSection
 */

/**
 * @param {string} content
 * @returns {{ lines: string[], newline: string, trailingNewline: boolean }}
 */
function splitContentLines(content) {
  const newline = content.includes("\r\n") ? "\r\n" : "\n";
  const trailingNewline = content.endsWith("\n");
  const lines = content.split(/\r?\n/);

  if (trailingNewline && lines.at(-1) === "") {
    lines.pop();
  }

  return { lines, newline, trailingNewline };
}

/**
 * @param {string[]} lines
 * @param {string} newline
 * @param {boolean} trailingNewline
 * @returns {string}
 */
function joinContentLines(lines, newline, trailingNewline) {
  const body = lines.join(newline);
  return trailingNewline ? `${body}${newline}` : body;
}

/**
 * @param {string[]} lines
 * @returns {string[]}
 */
function sortLines(lines) {
  return [...lines].sort(compareListItemLines);
}

/**
 * Sort awesome-list link lines within each contiguous block of entries.
 *
 * Section headers, table-of-contents links, blank lines, and other content are
 * left in place; only `- [name](url) - description` lines are reordered.
 *
 * @param {string} content
 * @returns {{ content: string, changed: boolean, sections: SortedSection[] }}
 */
export function sortReadmeLinks(content) {
  const { lines, newline, trailingNewline } = splitContentLines(content);
  /** @type {string[]} */
  const output = [];
  /** @type {string[]} */
  let buffer = [];
  /** @type {string | null} */
  let currentSection = null;
  /** @type {SortedSection[]} */
  const sections = [];

  const flushBuffer = () => {
    if (buffer.length === 0) {
      return;
    }

    const sorted = sortLines(buffer);
    const sectionChanged = sorted.some((line, index) => line !== buffer[index]);
    if (sectionChanged) {
      sections.push({ section: currentSection, lines: sorted });
    }

    output.push(...sorted);
    buffer = [];
  };

  for (const line of lines) {
    const sectionMatch = line.match(/^#{2,}\s+(.*)$/);
    if (sectionMatch) {
      flushBuffer();
      currentSection = sectionMatch[1];
      output.push(line);
      continue;
    }

    if (isSortableListItem(line)) {
      buffer.push(line);
      continue;
    }

    flushBuffer();
    output.push(line);
  }

  flushBuffer();

  return {
    content: joinContentLines(output, newline, trailingNewline),
    changed: sections.length > 0,
    sections,
  };
}

/**
 * @param {string} content
 * @param {string} sectionName
 * @returns {{ start: number, end: number, section: string } | null}
 */
function findSectionBlock(content, sectionName) {
  const { lines } = splitContentLines(content);
  const target = sectionName.toLowerCase();

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^#{2,}\s+(.*)$/);
    if (!match || match[1].toLowerCase() !== target) {
      continue;
    }

    let start = index + 1;
    while (start < lines.length && lines[start] === "") {
      start += 1;
    }

    let end = start;
    while (end < lines.length && isSortableListItem(lines[end])) {
      end += 1;
    }

    return { start, end, section: match[1] };
  }

  return null;
}

/**
 * Find the line index where a new awesome-list entry should be inserted.
 *
 * @param {string} content
 * @param {string} entryLine
 * @param {{ section: string }} options
 * @returns {{ lineNumber: number, section: string } | null}
 */
export function findInsertPosition(content, entryLine, options) {
  if (!isSortableListItem(entryLine)) {
    return null;
  }

  const block = findSectionBlock(content, options.section);
  if (!block) {
    return null;
  }

  const { lines } = splitContentLines(content);
  const blockLines = lines.slice(block.start, block.end);
  const sorted = sortLines([...blockLines, entryLine]);
  const insertOffset = sorted.indexOf(entryLine);

  return {
    lineNumber: block.start + insertOffset + 1,
    section: block.section,
  };
}

/**
 * Insert a new entry at its alphabetically sorted position within a section.
 *
 * @param {string} content
 * @param {string} entryLine
 * @param {{ section: string }} options
 * @returns {{ content: string, position: { lineNumber: number, section: string } }}
 */
export function insertReadmeLink(content, entryLine, options) {
  const position = findInsertPosition(content, entryLine, options);
  if (!position) {
    throw new Error(
      "Entry must match '- [name](url) - description' and target an existing section",
    );
  }

  const { lines, newline, trailingNewline } = splitContentLines(content);
  const insertAt = Math.max(0, position.lineNumber - 1);
  lines.splice(insertAt, 0, entryLine);

  return {
    content: joinContentLines(lines, newline, trailingNewline),
    position,
  };
}
