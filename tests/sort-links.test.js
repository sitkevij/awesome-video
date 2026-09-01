import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  sortReadmeLinks,
  insertReadmeLink,
  findInsertPosition,
} from "../scripts/lint-readme/sort-links.js";

describe("sortReadmeLinks", () => {
  it("sorts entries within a section case-insensitively", () => {
    const content = `## Players

- [zebra](https://example.com/z) - Last alphabetically.
- [apple](https://example.com/a) - First alphabetically.
`;

    const { content: sorted, changed } = sortReadmeLinks(content);
    assert.equal(changed, true);
    assert.match(sorted, /apple[\s\S]*zebra/);
  });

  it("leaves table-of-contents links untouched", () => {
    const content = `- [Players](#players)
- [zebra](https://example.com/z) - Out of order.
- [apple](https://example.com/a) - Also out of order.
`;

    const { content: sorted } = sortReadmeLinks(content);
    assert.match(sorted, /^- \[Players\]\(#players\)/m);
    assert.match(sorted, /apple[\s\S]*zebra/);
  });

  it("sorts each subsection independently", () => {
    const content = `## Language and platform specific libraries

### Python

- [zebra](https://example.com/z) - Python library.
- [apple](https://example.com/a) - Python library.

### Go

- [zebra-go](https://example.com/go-z) - Go library.
- [apple-go](https://example.com/go-a) - Go library.
`;

    const { content: sorted } = sortReadmeLinks(content);
    const pythonBlock = sorted.split("### Go")[0];
    const goBlock = sorted.split("### Go")[1];

    assert.match(pythonBlock, /apple[\s\S]*zebra/);
    assert.match(goBlock, /apple-go[\s\S]*zebra-go/);
  });

  it("reports unchanged content", () => {
    const content = `## Players

- [apple](https://example.com/a) - First.
- [zebra](https://example.com/z) - Second.
`;

    const { changed } = sortReadmeLinks(content);
    assert.equal(changed, false);
  });

  it("preserves a single trailing newline", () => {
    const content = `## Players

- [zebra](https://example.com/z) - Last.
- [apple](https://example.com/a) - First.
`;

    const { content: sorted } = sortReadmeLinks(content);
    assert.equal(sorted.endsWith("\n"), true);
    assert.equal(sorted.endsWith("\n\n"), false);
  });
});

describe("insertReadmeLink", () => {
  it("inserts a new entry in alphabetical order", () => {
    const content = `## Players

- [apple](https://example.com/a) - First.
- [zebra](https://example.com/z) - Last.
`;

    const entry = "- [mango](https://example.com/m) - Middle entry.";
    const { content: updated, position } = insertReadmeLink(content, entry, {
      section: "Players",
    });

    assert.equal(position.lineNumber, 4);
    assert.match(updated, /apple[\s\S]*mango[\s\S]*zebra/);
  });

  it("finds insert position for a new entry", () => {
    const content = `## Players

- [apple](https://example.com/a) - First.
- [zebra](https://example.com/z) - Last.
`;

    const position = findInsertPosition(
      content,
      "- [mango](https://example.com/m) - Middle entry.",
      { section: "Players" },
    );

    assert.equal(position?.lineNumber, 4);
    assert.equal(position?.section, "Players");
  });
});
