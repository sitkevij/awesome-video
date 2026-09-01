.PHONY: help install lint lint-readme check sort-readme test verify clean setup

# Default target
help:
	@echo "Available targets:"
	@echo "  make install      - Install npm dependencies"
	@echo "  make lint         - Lint markdown files"
	@echo "  make lint-readme  - Lint README.md format (awesome-list style)"
	@echo "  make check        - Validate README URL format (no network requests)"
	@echo "  make sort-readme  - Sort README links alphabetically within each section"
	@echo "  make test         - Run unit tests"
	@echo "  make verify       - Run all checks (lint, README, links, tests)"
	@echo "  make clean        - Remove temporary files"
	@echo "  make setup        - Install dependencies and setup husky hooks"

# Install npm dependencies
install:
	npm install

# Lint markdown files
lint:
	npx markdownlint-cli2 "**/*.md" "#node_modules"

# Lint README.md format
lint-readme:
	npm run lint-readme

# Validate URL format in README.md
check:
	npm run check-links

# Sort README links alphabetically
sort-readme:
	npm run sort-readme:write

# Run unit tests
test:
	npm test

# Run all checks
verify:
	npm run verify

# Clean temporary files
clean:
	rm -f urls.tmp urls_result.tmp
	rm -rf node_modules

# Setup project (install dependencies and setup husky)
setup: install
	npx husky install || true
