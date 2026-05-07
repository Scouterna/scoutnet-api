# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a pnpm monorepo containing an OpenAPI document for the Scoutnet API and generated client libraries. The source of truth is the OpenAPI schema; the TypeScript client is derived from it.

## Packages

- **`packages/scoutnet-openapi`** — The OpenAPI document (`schema/scoutnet.yaml`). Published to NPM as `@scouterna/scoutnet-openapi`. No build step; the YAML files are published as-is.
- **`packages/scoutnet`** — TypeScript/JavaScript API client. Published as `@scouterna/scoutnet`. Uses `openapi-fetch` and generates types from the OpenAPI schema.
- **`packages/swagger-ui`** — Vite app that renders the API docs. Deployed to GitHub Pages on release.
- **`packages/testing`** — Private scratch package for manually testing the client against a real Scoutnet environment.

## Commands

```bash
# Install dependencies
pnpm install

# Build the TypeScript client (generates types then compiles)
cd packages/scoutnet && pnpm build

# Lint TypeScript/JavaScript (Biome)
pnpm biome check .
pnpm biome check --write .  # auto-fix

# Run the testing scratch package (requires .env with credentials)
cd packages/testing && pnpm dev

# Build the swagger-ui app
cd packages/swagger-ui && pnpm build
```

## How the TypeScript client is built

1. `generate-types.ts` in `packages/scoutnet` runs `openapi-typescript` against `@scouterna/scoutnet-openapi/schema/scoutnet.yaml` and writes `src/generated/api-types.ts`.
2. `tsc` compiles `src/` to `dist/`.

The type generator applies two custom transforms (in `generate-types.ts`):
- Empty object schemas (`{}`) become `unknown`.
- Optional properties have `| null` added to their type union, to match what Scoutnet actually returns.

## OpenAPI schema structure

`schema/scoutnet.yaml` is the root document. Paths and components are split into separate files and referenced via `$ref`:

- `schema/paths/` — one file per endpoint, named after the URL path (e.g. `project_checkin.yaml` for `/project/checkin`)
- `schema/components/` — reusable schema objects (data models, not body wrappers)

Conventions to follow when adding endpoints:
- Path files contain the full operation inline. Request and response schemas are inlined in the path file, not extracted into components, unless a schema is reused across multiple endpoints.
- Components are for data *models* (e.g. `checkin.yaml`, `form.yaml`), not body containers.
- Nullable fields use `type: [integer, 'null']` (OpenAPI 3.1 style), not `nullable: true`.
- If a field should only appear in responses (e.g. server-assigned IDs), create a separate `*_response.yaml` component that `allOf`-extends the base component and adds the extra fields. Do not use `readOnly: true` — the generated client does not remove `readOnly` fields from request types.
- The schema is linted with [vacuum](https://quobix.com/vacuum/) on PRs. Disabled rules are in `vacuum-ruleset.yaml`.
- Do not document authentication-related query parameters (e.g. `auth_body_type`, `auth_body_id`) in path files.

## Releases

Releases are managed by [release-please](https://github.com/googleapis/release-please). It tracks `packages/scoutnet` and `packages/scoutnet-openapi` and also bumps the `version` field inside `schema/scoutnet.yaml`. On release, CI publishes both packages to NPM independently under their own Git tags (`scoutnet-v*` and `scoutnet-openapi-v*`).
