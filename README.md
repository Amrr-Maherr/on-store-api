# On Store API

A RESTful e-commerce backend API built with **Node.js, TypeScript, Express, and MongoDB (Mongoose)**.

The project follows a module-based architecture. As of the current implementation state, the **Categories** and **Brands** catalog modules are fully implemented, while the remaining e-commerce domain modules are scaffolded but not yet implemented.

> **Status note:** This README documents the project **as it currently exists**. Anything not yet implemented is explicitly labeled `Planned`.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Database Models](#database-models)
- [Authentication & Authorization](#authentication--authorization)
- [Validation & Error Handling](#validation--error-handling)
- [Configuration](#configuration)
- [Getting Started](#getting-started)
- [Current Progress](#current-progress)
- [Roadmap](#roadmap)
- [Development Conventions](#development-conventions)
- [Documentation](#documentation)
- [License](#license)

---

## Tech Stack

Technologies actually used in the codebase:

| Technology        | Version           | Usage                                                    |
| ----------------- | ----------------- | -------------------------------------------------------- |
| Node.js           | —                 | Runtime, ES Modules (`"type": "module"`)                 |
| Express           | ^5.2.1            | HTTP framework (Express 5)                               |
| TypeScript        | ^5.9.3            | Strict mode, `NodeNext` resolution, compiled to `./dist` |
| MongoDB           | ^7.6.0            | Database driver dependency                               |
| Mongoose          | ^9.9.4            | ODM — schema/models, queries                             |
| express-validator | ^7.3.2            | Request validation                                       |
| cors              | ^2.8.6            | Cross-origin requests                                    |
| morgan            | ^1.12.1           | HTTP request logging                                     |
| dotenv            | ^17.4.2           | Environment variables                                    |
| nodemon + tsx     | ^3.1.0 / ^4.23.13 | Development runner (TypeScript execution)                |
| prettier          | ^3.9.6            | Code formatting                                          |

Installed dependencies that are **not used in the code yet** (planned usage):

- `bcrypt` — no usage found
- `multer` — no usage found
- `nodemailer` — no usage found
- `jest`, `ts-jest`, `supertest` — no tests exist yet

---

## Architecture

### Request flow

The implemented request flow for the working modules:

```text
Request
  ↓
Routes (module router)
  ↓
Validation (express-validator rules)
  ↓
validateRequest middleware
  ↓
Controller
  ↓
Mongoose Model
  ↓
MongoDB
```

Notes on the current implementation:

- The **service layer is present as a file convention only** — all `*.service.ts` files are empty. Controllers currently access Mongoose models directly.
- Controllers perform database operations (`create`, `findById`, `findByIdAndUpdate`, `findByIdAndDelete`) and build the HTTP response.
- Validation rules are applied at the route level, followed by the shared `validateRequest` middleware.

### Middleware chain (in `src/app.ts`)

1. `cors()` — enables cross-origin requests
2. `morgan('dev')` — request logging
3. `express.json({ limit: '1mb' })` — JSON body parsing with a 1 MB size cap
4. Module routers mounted under `/api/v1/*`
5. `validateRequest` — validates the current request
6. `errorHandler` — centralized error responses

### Module layout

Every module is self-contained under `src/modules/<name>/` with the same file convention:

```text
<name>/
├── <name>.controller.ts
├── <name>.model.ts
├── <name>.routes.ts
├── <name>.service.ts
├── <name>.validation.ts
├── index.ts
└── README.md
```

Each module's `index.ts` re-exports controller, model, service, validation, and routes.

---

## Project Structure

```text
.
├── .env                         # environment variables (gitignored)
├── .gitignore
├── package.json
├── tsconfig.json
├── diagrams/                    # architecture diagrams (.drawio)
│   ├── E-commerc Diagram.drawio # overall system architecture (target design)
│   └── <module>/<module>.drawio # per-module diagrams
└── src/
    ├── app.ts                   # entry point — middleware + route registration
    ├── .prettierrc              # Prettier configuration
    ├── config/
    │   └── db.ts                # MongoDB connection (mongoose)
    ├── middlewares/
    │   ├── validateRequest.ts   # validation result middleware
    │   ├── errorHandler.ts      # centralized error handler
    │   └── notFound.ts          # empty (not yet implemented)
    ├── modules/
    │   ├── brands/              # implemented
    │   ├── categories/          # implemented
    │   ├── cart/                # skeleton
    │   ├── coupons/             # skeleton
    │   ├── orders/              # skeleton
    │   ├── payments/            # skeleton
    │   ├── products/            # skeleton
    │   ├── ratings/             # skeleton
    │   ├── reviews/             # skeleton
    │   ├── users/               # skeleton
    │   └── wishlist/            # skeleton
    └── utils/                   # empty
```

---

## API Reference

All routes are mounted under the `/api/v1` prefix.

### Implemented endpoints

The **Categories** and **Brands** modules implement the same REST pattern (list, get by id, create, update, delete).

| Method | Endpoint                 | Description                  | Validation applied                                |
| ------ | ------------------------ | ---------------------------- | ------------------------------------------------- |
| GET    | `/api/v1/categories`     | Paginated list of categories | —                                                 |
| GET    | `/api/v1/categories/:id` | Get a single category by id  | `validateCategoryId`                              |
| POST   | `/api/v1/categories`     | Create a category            | `createCategoryValidation`                        |
| PATCH  | `/api/v1/categories/:id` | Update a category            | `validateCategoryId` + `updateCategoryValidation` |
| DELETE | `/api/v1/categories/:id` | Delete a category            | `validateCategoryId`                              |
| GET    | `/api/v1/brands`         | Paginated list of brands     | —                                                 |
| GET    | `/api/v1/brands/:id`     | Get a single brand by id     | `validateBrandId`                                 |
| POST   | `/api/v1/brands`         | Create a brand               | `createBrandValidation`                           |
| PATCH  | `/api/v1/brands/:id`     | Update a brand               | `validateBrandId` + `updateBrandValidation`       |
| DELETE | `/api/v1/brands/:id`     | Delete a brand               | `validateBrandId`                                 |

Each route that validates uses the shared `validateRequest` middleware after the validation rules.

#### List query parameters

`GET /api/v1/categories` and `GET /api/v1/brands` support:

- `page` — page number (defaults to `1`)
- `limit` — results per page (defaults to `25`)
- `search` — a name search filter is defined in the controller

> **Note:** the `search` filter is currently non-functional because the controller checks `search === 'string'` instead of a type check. Pagination works; search/name-filtering does not yet apply.

#### Validation contracts

**Create** requires `name`, `slug`, `image`, `owner` (all non-empty). **Update** allows optional `name` and `image`. The `:id` parameter must be a valid MongoDB ObjectId.

> **Note:** the create controller reads `name`, `slug`, and `image` from the request body but does not pass `owner` to the model, although `owner` is required by the schema. As a result, create requests currently fail at the database level.

#### Response shapes (verified from controller code)

```jsonc
// 200 GET list
{
  "status": "success",
  "results": 1,
  "data": { "allCategories": [] }
}

// 200 GET one / PATCH update
{ "status": "success", "data": { "category": {} } }

// 201 create
{ "status": "success", "data": { "newCategory": {} } }

// 200 delete
{ "status": "success", "message": "Category deleted successfully" }

// 404 not found
{ "status": "failed", "message": "Category not found" }

// 400 validation error (from validateRequest)
{ "status": "fail", "errors": [] }
```

---

### Skeleton endpoints (registered but not implemented)

The following modules register routes that delegate to **empty controller handlers**. No model, service, or validation exists, and no response is returned, so requests to these endpoints do not complete.

| Module   | Registered routes (no implementation)                            |
| -------- | ---------------------------------------------------------------- |
| cart     | `GET/POST /api/v1/cart`, `PATCH/DELETE /api/v1/cart/:id`         |
| coupons  | `GET/POST /api/v1/coupons`, `PATCH/DELETE /api/v1/coupons/:id`   |
| orders   | `GET/POST /api/v1/orders`, `PATCH/DELETE /api/v1/orders/:id`     |
| payments | `GET/POST /api/v1/payments`, `PATCH/DELETE /api/v1/payments/:id` |
| products | `GET/POST /api/v1/products`, `PATCH/DELETE /api/v1/products/:id` |
| ratings  | `GET/POST /api/v1/ratings`, `PATCH/DELETE /api/v1/ratings/:id`   |
| reviews  | `GET/POST /api/v1/reviews`, `PATCH/DELETE /api/v1/reviews/:id`   |
| users    | `GET/POST /api/v1/users`, `PATCH/DELETE /api/v1/users/:id`       |
| wishlist | `GET/POST /api/v1/wishlist`, `PATCH/DELETE /api/v1/wishlist/:id` |

---

## Database Models

Only two models are currently implemented.

### Category

```text
Category
 ├── name     (String, required, trimmed)
 ├── image    (String, required)
 ├── slug     (String, required, unique, trimmed)
 └── owner    (ObjectId → User, required)
timestamps: true · versionKey: false
```

### Brand

```text
Brand
 ├── name     (String, required, trimmed)
 ├── image    (String, required)
 ├── slug     (String, required, unique, trimmed)
 └── owner    (ObjectId → User, required)
timestamps: true · versionKey: false
```

### Relationships

- `Category.owner` references the `User` model — `Planned` (the `User` Mongoose model is not implemented yet).
- `Brand.owner` references the `User` model — `Planned` (the `User` Mongoose model is not implemented yet).

All other models (`User`, `Product`, `Cart`, `Coupon`, `Order`, `Payment`, `Rating`, `Review`, `Wishlist`) are `Planned` — their `*.model.ts` files are currently empty.

---

## Authentication & Authorization

Authentication and authorization are **planned but not implemented yet**.

- No authentication middleware exists.
- No JWT library is installed.
- No user model exists.
- No protected routes exist.
- All routes are currently public.
- `bcrypt`, `multer`, and `nodemailer` are installed as dependencies but are not used anywhere in the source.

The `owner` fields on `Category` and `Brand` are intended to be tied to a user account, but that behavior is not implemented.

---

## Validation & Error Handling

### Validation

- Request validation uses **express-validator** rules defined per module in `*.validation.ts`.
- Rules are applied at the route level, followed by the shared `validateRequest` middleware.
- `validateRequest` (`src/middlewares/validateRequest.ts`) collects `validationResult(req)` and, if invalid, responds with:

```json
{ "status": "fail", "errors": [...] }
```

with an HTTP `400` status.

- MongoDB ObjectId parameters are validated with `param('id').isMongoId()` (e.g., `validateCategoryId`, `validateBrandId`).

### Error handling

- `errorHandler` (`src/middlewares/errorHandler.ts`) is registered as the final middleware and centralizes error responses:

```json
{ "status": "error" | "fail", "message": "<error message>" }
```

- The HTTP status is `err.statusCode` when set, otherwise `500`.
- `status` is `"error"` for `>= 500` and `"fail"` otherwise.

### 404 handling

- `Planned` — `src/middlewares/notFound.ts` exists but is **empty**, and no 404 handler is registered in `app.ts`. Unknown routes currently fall through to Express's default 404 response.

---

## Configuration

Environment configuration is loaded with `dotenv` from `.env` (gitignored — no `.env.example` is provided).

Required environment variables (read from the source):

| Variable   | Used in            | Purpose                         | Example value                        |
| ---------- | ------------------ | ------------------------------- | ------------------------------------ |
| `APP_PORT` | `src/app.ts`       | Port the HTTP server listens on | `3000`                               |
| `APP_URL`  | `src/config/db.ts` | MongoDB connection string       | `mongodb://127.0.0.1:27017/on-store` |

The default `connectDB()` throws if `APP_URL` is not defined. The database connection is established before the server starts listening.

---

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB (local or remote connection string)

### Installation

```bash
npm install
```

### Environment

Create a `.env` file at the project root with the required variables:

```bash
APP_PORT=3000
APP_URL=mongodb://127.0.0.1:27017/on-store
```

### Available scripts

| Command          | Description                                                                   |
| ---------------- | ----------------------------------------------------------------------------- |
| `npm run dev`    | Start the dev server with hot reload (`nodemon --exec tsx src/app.ts`)        |
| `npm run build`  | Compile TypeScript to `./dist` (`tsc`)                                        |
| `npm start`      | Run the compiled app (`nodemon dist/app.js`) — requires `npm run build` first |
| `npm run format` | Format the entire project (`prettier --write .`)                              |

> There is currently **no test script** in `package.json`.

---

## Current Progress

### Completed

- Project scaffolding — Node.js + TypeScript + Express 5 (ESM, strict TS).
- Middleware setup — CORS, `morgan` logging, JSON body parsing (1 MB limit).
- Database connection via Mongoose.
- Centralized request validation middleware (`validateRequest`).
- Centralized error-handling middleware (`errorHandler`).
- **Categories module** — full CRUD + get-by-id with validation and pagination.
- **Brands module** — full CRUD + get-by-id with validation and pagination (mirrors Categories).

### In Progress

- **Scaffolded modules** — `cart`, `coupons`, `orders`, `payments`, `products`, `ratings`, `reviews`, `users`, `wishlist`:
  - routes and (empty) controller stubs exist
  - models, services, and validations are empty files
  - no functionality implemented

### Planned

- Authentication and authorization (no JWT/authentication middleware exists).
- `User` model and ownership behavior for `owner` references.
- Functional implementations for all scaffolded modules.
- Working search/name filtering on list endpoints.
- 404 handling middleware (`notFound.ts` is empty).
- Tests (jest/supertest are installed but no tests or test script exist).

---

## Roadmap

```text
Completed
├── Express + TypeScript + MongoDB scaffolding
├── Validation middleware + centralized error handling
├── Categories module (CRUD + get by id + pagination)
└── Brands module (CRUD + get by id + pagination)

In Progress
├── Scaffolded module skeletons (users, products, cart, coupons,
│   orders, payments, ratings, reviews, wishlist)
└── Fix create flow for owner-required models

Next
├── User model + authentication & authorization
├── Ownership enforcement (owner fields)
├── Product / Brand / Category relationships
└── Tests (jest + supertest) and a test script

Future
├── Functional cart, orders, payments, coupons, ratings, reviews, wishlist
├── Role-based access control (RBAC)
├── File uploads (multer is installed)
├── Email notifications (nodemailer is installed)
├── Deployment and production hardening
└── Reusable service layer (currently empty files)
```

---

## Development Conventions

The following conventions are currently followed by the codebase:

- **Module/feature-based architecture** — each domain lives in `src/modules/<name>/`.
- **Consistent file layout per module** — model, controller, service, validation, routes, index, README.
- **Layered separation (routes → validation → controller → model)** — service files exist but are empty; controllers currently talk to Mongoose directly.
- **Centralized middleware** — shared `validateRequest` and `errorHandler` in `src/middlewares/`.
- **REST API under `/api/v1`**.
- **TypeScript strict mode** with ES modules and `NodeNext` resolution.
- **Mongoose models** with `timestamps: true` and `versionKey: false`.
- **Prettier formatting** (`singleQuote`, `semi`, 2-space indent, print width 100).

---

## Documentation

Architecture diagrams (`.drawio`) are stored in the `diagrams/` folder:

- `diagrams/E-commerc Diagram.drawio` — overall system architecture (target design).
- One diagram per module, e.g. `diagrams/brands/brands.drawio`, `diagrams/categories/categories.drawio`.

> The overall diagram represents a target architecture (including JWT, auth, services, file uploads, etc.) that is **not yet implemented** in the code. See the [Current Progress](#current-progress) section for the actual state.

---

## License

ISC
