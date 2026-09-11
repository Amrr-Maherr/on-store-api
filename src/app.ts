import express, { type Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { brandsRouter } from './modules/brands/brands.routes.js';
import { cartRouter } from './modules/cart/cart.routes.js';
import { categoriesRouter } from './modules/categories/categories.routes.js';
import { couponsRouter } from './modules/coupons/coupons.routes.js';
import { ordersRouter } from './modules/orders/orders.routes.js';
import { paymentsRouter } from './modules/payments/payments.routes.js';
import { productsRouter } from './modules/products/products.routes.js';
import { ratingsRouter } from './modules/ratings/ratings.routes.js';
import { reviewsRouter } from './modules/reviews/reviews.routes.js';
import { usersRouter } from './modules/users/users.routes.js';
import { wishlistRouter } from './modules/wishlist/wishlist.routes.js';

dotenv.config();

const app: Express = express();
const port = process.env.APP_PORT;

app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/brands', brandsRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/coupons', couponsRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/payments', paymentsRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/ratings', ratingsRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/wishlist', wishlistRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });