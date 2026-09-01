import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { lintReadmeContent, lintUrlFormats } from "../scripts/lint-readme/index.js";
import { validateUrlFormat } from "../scripts/lint-readme/url-format.js";

describe("lintReadmeContent", () => {
  it("treats alphabetical order issues as warnings", () => {
    const content = `## Test Section

- [zebra](https://example.com/z) - Listed before apple.
- [apple](https://example.com/a) - Listed after zebra.
`;

    const reporter = lintReadmeContent(content, { silent: true });
    assert.equal(reporter.exitCode(), 0);
    assert.equal(reporter.warningCount, 1);
    assert.equal(reporter.errorCount, 0);
  });

  it("fails on malformed list item descriptions", () => {
    const content = `## Test Section

- [demo](https://example.com) - Missing punctuation
`;

    const reporter = lintReadmeContent(content, { silent: true });
    assert.equal(reporter.exitCode(), 1);
    assert.ok(reporter.errorCount > 0);
  });
});

describe("lintUrlFormats", () => {
  it("rejects malformed hosts without network access", () => {
    const content = "- [bad](https://exa$mple.com) - Invalid host.";

    const reporter = lintUrlFormats(content, { silent: true });
    assert.equal(reporter.exitCode(), 1);
    assert.ok(reporter.errorCount > 0);
  });

  it("accepts well-formed URLs", () => {
    const content = "- [good](https://example.com/path) - Valid URL.";

    const reporter = lintUrlFormats(content, { silent: true });
    assert.equal(reporter.exitCode(), 0);
  });
});

describe("validateUrlFormat", () => {
  it("requires an http or https scheme", () => {
    assert.equal(validateUrlFormat("ftp://example.com"), "Malformed URL");
  });
});
