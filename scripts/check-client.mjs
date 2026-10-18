#!/usr/bin/env node
/*
 * Enforces the "use client" rule from CLAUDE.md. A component file without "use client" stays
 * importable from React Server Components, so it must not:
 *   - call hooks (useState, React.useRef, useClearable, …) or createContext
 *   - import motion/react or a hook module (src/lib/use-*.ts)
 *   - pass functions in JSX (event handlers, render functions, arrow-function props)
 * Breaking this compiles and passes the Storybook tests, but crashes in a Next.js server component.
 * Conversely, a file with "use client" that needs none of it should drop the directive.
 */
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "src/components");

const checks = [
  [/\b(?:React\.)?use[A-Z]\w*(?:<[^>()]*>)?\(/, "calls a hook"],
  [/\bcreateContext\(/, "creates a context"],
  [/from\s+["']motion\/react["']/, "imports motion/react"],
  [/from\s+["']\.\.\/lib\/use-[\w-]+\.js["']/, "imports a hook module"],
  [/\son[A-Z]\w*=\{/, "passes an event handler"],
  [/\s\w+=\{\s*(?:async\s*)?(?:\([^)]*\)|\w+)\s*=>/, "passes a function prop"],
  [/\s\w+=\{\s*function\b/, "passes a function prop"],
];

function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

const errors = [];
const unneeded = [];

for (const file of readdirSync(dir).sort()) {
  if (!/\.tsx?$/.test(file) || file.includes(".stories.")) continue;
  const source = readFileSync(path.join(dir, file), "utf8");
  const isClient = /^\s*["']use client["']/.test(source);
  const code = stripComments(source);
  const lines = code.split("\n");
  const found = [];
  for (const [pattern, reason] of checks) {
    const index = lines.findIndex((line) => pattern.test(line));
    if (index !== -1) found.push(`${reason} (line ${index + 1}: ${lines[index].trim().slice(0, 80)})`);
  }
  if (!isClient && found.length) errors.push(`src/components/${file} needs "use client": it ${found.join("; ")}`);
  if (isClient && !found.length) unneeded.push(`src/components/${file} has "use client" but doesn't need it`);
}

for (const message of [...errors, ...unneeded]) console.error(`✗ ${message}`);
if (errors.length || unneeded.length) {
  console.error('\nSee the "use client" rule in CLAUDE.md.');
  process.exit(1);
}
console.log('✓ "use client" directives match what each component needs.');
