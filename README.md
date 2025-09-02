# Web Components Language Server

This project provides a language server and editor extensions for using Web Components and custom elements. It offers advanced HTML diagnostics, completion, and validation for custom elements, including support for attribute types, deprecation, and duplicate attribute detection.

## Features

- HTML diagnostics for custom elements and attributes
- Attribute type validation (boolean, number, enum, string)
- Deprecated element and attribute warnings
- Duplicate attribute detection
- Completion and hover support for custom elements
- Configurable diagnostics severity
- Works with any Web Components library that provides a Custom Elements Manifest

## Monorepo Structure

- `packages/language-server`: Core language server implementation
- `packages/vscode`: VSCode extension client
- `packages/cem-utilities`: Utilities for parsing custom element manifests

## Getting Started

1. **Install dependencies:**

   ```sh
   pnpm install
   ```

2. **Build the project:**

   ```sh
   pnpm run build
   ```

3. **Open in VSCode:**

   - Open this folder in VSCode.
   - Press `Ctrl+Shift+B` to compile the client and server.

4. **Debug the extension:**

   - Switch to the Debug view.
   - Select `Launch Client` and start debugging.
   - Optionally, use `Attach to Server` to debug the server process.

5. **Try it out:**

   - Open an HTML file and use custom elements.
   - See diagnostics for invalid attributes, deprecated usage, and duplicates.

## Testing

This repository uses Node's built-in test runner. The root `test` script runs `node --test` and executes test files that use the Node `test` API.

Quick commands

- Run all repository tests (root):

```bash
pnpm run test
```

- Run a single test file with Node directly:

```bash
node --test path/to/test-file.mjs
```

- Run tests for a specific package (example for CLI):

```bash
node --test packages/wclint/test/*.mjs
```

Notes

- `package.json` includes `"type": "module"`, so ES module test files (`.js` / `.mjs`) are treated as ESM and you should not see module-type warnings when running `node --test`.
- Tests are written against Node's `test` API (import `test` from `node:test` and `assert` from `assert`).

CI recommendations

- Install dependencies with a frozen lockfile: `pnpm install --frozen-lockfile`.
- Run `pnpm run build` before tests to catch TypeScript issues.
- Run `pnpm run test` to execute the Node tests.

If you'd like a separate npm script name for the Node runner, add a `test:node` script in `package.json` (optional).

## Packaging & Publishing

### VS Code

- To create a local `.vsix` package run:
  ```sh
  pnpm vscode:pack
  ```
- The `.vsix` file will be created in `packages/vscode/` for manual installation.
- To publish the package run:
  ```sh
  pnpm vscode:release
  ```

## Configuration

You can customize diagnostics and other behaviors via a `wc.config.js` file in your workspace root. See the documentation in `packages/language-server/src/services/configuration-service.ts` for available options.

## References

- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [VSCode Language Server Protocol](https://microsoft.github.io/language-server-protocol/)
- [Volar Framework](https://github.com/volarjs/volar)
