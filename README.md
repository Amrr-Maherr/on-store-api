# On Store API

A RESTful API for an e-commerce store built with Node.js, TypeScript, and Express.

## Features

- User authentication and authorization
- Product management
- Brand and category management
- Shopping cart
- Order processing
- Payment handling
- Coupon system
- Reviews and ratings
- Wishlist

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── config/       # Configuration files
├── middlewares/   # Express middlewares
├── modules/      # Feature modules
│   ├── brands/
│   ├── cart/
│   ├── categories/
│   ├── coupons/
│   ├── orders/
│   ├── payments/
│   ├── products/
│   ├── ratings/
│   ├── reviews/
│   ├── users/
│   └── wishlist/
├── utils/        # Utility functions
└── app.ts        # Entry point
```

## License

ISC
