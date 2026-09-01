# Contribution Guidelines

**To add, remove, or change things on the list:** Submit a pull request

This is a specially curated list for high-quality, video resources.

- List items should be sorted _alphabetically_.
- Each item should be limited to one link.
- The link should be the name of the package or project.
- Descriptions should be clear, concise, and non-promotional.
- Descriptions should follow the link, on the same line and end with a punctuation mark.
- At least 3 items are needed to create a new category.

Please contribute links to packages/projects you have used or are familiar with. This will help
ensure high-quality entries.

## Setup

Node.js 20+ is required (`markdownlint-cli2`). CI uses Node 24; if you use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm), run `nvm use` / `fnm use` in the repo root (see `.nvmrc`).

```sh
npm install
```

## Sort links

Sort entries alphabetically within each README section before opening a pull request.

```sh
# Check whether README.md needs sorting
npm run sort-readme:check

# Sort README.md in place
npm run sort-readme:write
```

Insert a new entry in the correct position within a section:

```sh
npm run sort-readme -- --add "- [name](https://example.com) - Short description." --section "Players"
```

## Lint and test

Run the same checks used in CI:

```sh
# All checks (unit tests, markdownlint, README format, URL format)
npm run verify

# Unit tests only
npm test
```

Individual checks:

```sh
npm run lint-readme
npm run check-links
npm run lint
```

Or with Make:

```sh
make verify
make test
make lint-readme
make sort-readme
```
