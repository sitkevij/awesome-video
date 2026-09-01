#!/usr/bin/env node
import { spawnSync } from "node:child_process";

/** @type {{ title: string, script: string }[]} */
const steps = [
  { title: "unit tests", script: "test:unit" },
  { title: "markdownlint", script: "lint" },
  { title: "README format", script: "lint-readme" },
  { title: "URL format", script: "check-links" },
];

let failed = false;

for (let index = 0; index < steps.length; index += 1) {
  const step = steps[index];
  if (index > 0) {
    console.log("");
  }
  console.log(`=== ${step.title} ===`);
  const result = spawnSync("npm", ["run", step.script], {
    stdio: "inherit",
    shell: false,
  });

  if (result.status !== 0) {
    failed = true;
    break;
  }
}

if (failed) {
  process.exit(1);
}

console.log("\n=== all checks passed ===");
