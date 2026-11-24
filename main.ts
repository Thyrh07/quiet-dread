// Two Days of Quiet Dread — make.fun entry.
// Writes one code review comment (single line, at most 140 characters)
// that approves a pull request while carrying quiet existential dread.
// Gate validation keeps the comment honest: one line, 1-140 chars,
// approves the PR, no trailing newline. A bad comment fails loudly
// instead of shipping.

import { mkdirSync, writeFileSync } from "node:fs";

const OUTPUT = "/output/entry.txt";

// The comment: approval up front, dread carried by understatement —
// one day the future digs up this diff and credits us with a plan
// we never had. Flat tone, no exclamation, reads like a tired
// engineer pasting it before clicking approve.
const COMMENT =
  "Approved. One day, archaeologists will dig up this diff and conclude we knew exactly what we were doing.";

function gate(): void {
  if (COMMENT.length < 1 || COMMENT.length > 140) {
    throw new Error(`entry must be 1-140 chars, got ${COMMENT.length}`);
  }
  if (COMMENT.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (COMMENT.endsWith("\n")) {
    throw new Error("entry must not end with a newline");
  }
  if (!/^Approved\b/i.test(COMMENT)) {
    throw new Error("entry must approve the pull request");
  }
}

gate();
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT, COMMENT, "utf8");
