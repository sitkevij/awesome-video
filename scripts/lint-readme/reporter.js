/**
 * Collects lint diagnostics and prints shell-compatible output.
 */
export class Reporter {
  /** @type {number} */
  errorCount = 0;

  /** @type {number} */
  warningCount = 0;

  /** @type {boolean} */
  #quiet;

  /**
   * @param {{ quiet?: boolean }} [options]
   */
  constructor(options = {}) {
    this.#quiet = options.quiet ?? false;
  }

  /**
   * @param {...unknown} args
   */
  log(...args) {
    if (!this.#quiet) {
      console.log(...args);
    }
  }

  /**
   * @param {string} message
   * @param {string} fix
   * @param {string[]} [details]
   */
  error(message, fix, details = []) {
    if (!this.#quiet) {
      console.log(`ERROR: ${message}`);
      console.log(`SUGGESTED FIX: ${fix}`);
      for (const detail of details) {
        console.log(detail);
      }
    }
    this.errorCount += 1;
  }

  /**
   * @param {string} message
   * @param {string} fix
   * @param {string[]} [details]
   */
  warn(message, fix, details = []) {
    if (!this.#quiet) {
      console.log(`WARNING: ${message}`);
      console.log(`SUGGESTED FIX: ${fix}`);
      for (const detail of details) {
        console.log(detail);
      }
    }
    this.warningCount += 1;
  }

  /** @returns {number} */
  exitCode() {
    return this.errorCount > 0 ? 1 : 0;
  }

  printSummary() {
    if (this.#quiet) {
      return;
    }

    console.log("");
    if (this.errorCount === 0) {
      if (this.warningCount === 0) {
        console.log("✓ All format checks passed!");
      } else {
        console.log(
          `✓ All format checks passed (${this.warningCount} warning(s))`,
        );
      }
      return;
    }

    if (this.warningCount > 0) {
      console.log(
        `✗ Found ${this.errorCount} error(s) and ${this.warningCount} warning(s)`,
      );
      return;
    }

    console.log(`✗ Found ${this.errorCount} error(s)`);
  }
}
