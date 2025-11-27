.PHONY: help install lint lint-readme check shellcheck test clean setup

# Default target
help:
	@echo "Available targets:"
	@echo "  make install      - Install npm dependencies"
	@echo "  make lint         - Lint markdown files"
	@echo "  make lint-readme  - Lint README.md format (awesome-list style)"
	@echo "  make check        - Run documentation checks (whitespace, URLs)"
	@echo "  make shellcheck   - Run shellcheck on shell scripts"
	@echo "  make test         - Run all checks (lint, lint-readme, shellcheck, check)"
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
	./lint_readme.sh

# Run shellcheck on shell scripts
shellcheck:
	shellcheck lint_readme.sh

# Run all checks
test: lint lint-readme shellcheck
	@echo "All checks passed!"

# Clean temporary files
clean:
	rm -f urls.tmp urls_result.tmp
	rm -rf node_modules

# Setup project (install dependencies and setup husky)
setup: install
	npx husky install || true

