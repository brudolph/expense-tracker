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

React 19 + Vite app split across four components:

- **`App.jsx`** — holds the `transactions` array in state, seeds it with hardcoded data, and passes it down. No persistence; refresh wipes new entries.
- **`Summary.jsx`** — receives `transactions`, computes `totalIncome`, `totalExpenses`, and `balance` via `filter`/`reduce`, and renders the three summary cards.
- **`TransactionForm.jsx`** — owns its own form state (description, amount, type, category) and calls the `onAdd` prop with a new transaction object. Parses `amount` to a float before passing it up.
- **`TransactionList.jsx`** — receives `transactions`, owns filter state (type, category), and renders the filtered table.

The `categories` array is duplicated in `TransactionForm` and `TransactionList` — a candidate for extraction to a shared constants file.

## Lint rule worth knowing

`eslint.config.js` sets `no-unused-vars` with `varsIgnorePattern: '^[A-Z_]'` — unused identifiers starting with an uppercase letter or underscore are allowed (useful for unused React component imports during scaffolding).
