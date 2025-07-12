import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './DB/connect.js';
import productRoutes from './routes/products.route.js';

config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/products', productRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(` Server http://localhost:${PORT} da ishga tushdi`);
  });
};

startServer();