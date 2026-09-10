import express, { type Express, type Request, type Response } from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import { categoriesRouter } from './modules/categories/categories.routes.js';
dotenv.config();
const app: Express = express();
const port = process.env.APP_PORT
app.use("/api/v1/categories", categoriesRouter)
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`running on port ${port}`);
  });
}).catch((error) => {
  console.log(error);
})