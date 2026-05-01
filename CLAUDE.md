# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

Starter project for the [Code with Mosh "Claude Code" course](https://codewithmosh.com/p/claude-code). It is a React + Vite expense tracker that **intentionally ships with bugs, poor UI, and messy code** — these are fixed progressively as exercises throughout the course. Do not assume defects are accidental; check whether the user is working through a course exercise before "fixing" things they may want to address themselves.

## Commands

```bash
npm run dev      # start Vite dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run lint     # eslint . (flat config in eslint.config.js)
npm run preview  # preview a production build
```

There is no test runner configured.

## Architecture

Single-component React 19 app. Everything lives in `src/App.jsx`:

- All state (transactions list, form fields, filters) is held in `useState` hooks at the top of `App`.
- Transactions are seeded as a hardcoded array; **there is no persistence** (refresh wipes new entries).
- Income/expense totals and `balance` are derived inline on each render via `filter`/`reduce` over `transactions`.
- The category list is a hardcoded array inside the component.

### Known latent bug

`amount` is stored as a **string** (from the `<input type="number">`) but `totalIncome` / `totalExpenses` use `reduce((sum, t) => sum + t.amount, 0)`. With a `0` initial value the `+` operator concatenates strings instead of summing them, so totals are wrong as soon as a user adds a transaction. This is one of the bugs the course walks through fixing — flag it but confirm before silently changing it.

## Lint rule worth knowing

`eslint.config.js` sets `no-unused-vars` with `varsIgnorePattern: '^[A-Z_]'` — unused identifiers starting with an uppercase letter or underscore are allowed (useful for unused React component imports during scaffolding).
