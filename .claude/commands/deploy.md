Deploy the application to the staging server by running the following steps in order. Stop and report the error if any step fails.

1. **Run tests** — execute `npm test` and confirm all tests pass.
2. **Build production bundle** — run `npm run build` and confirm it completes without errors.
3. **Push to staging** — run `npm run deploy:staging` (or the project-specific deploy command) to push the build to the staging server.

Report the result of each step as you go, and summarize what was deployed (branch, build output, staging URL) when done.
