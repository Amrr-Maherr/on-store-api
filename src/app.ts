import express, { type Express, type Request, type Response } from 'express';
require('dotenv').config()
const app: Express = express();
const port = process.env.APP_PORT
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});