import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';
import productsRouter from './routes/productsRouter.js';
import usersRouter from './routes/usersRouter.js';
import { isAdmin } from './middleware/authenticate.js';

config();

let PORT = process.env.PORT || 5005;
const app = express();

app.use(cors({
    origin: ['http://localhost:8080', 'https://capstoneproject-1-9k8p.onrender.com'],
    credentials: true,
    headers: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin']
  }));

app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.get('/admin', isAdmin, (req, res) => {
  // Admin page logic here
});

app.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});

app.get('^/$|/capstoneaproject-backend', (req, res) => {
  res.status(200).sendFile(path.resolve('./static/html/index.html'));
});

app.get('*', (req, res) => {
  res.json({
    status: 404,
    msg: 'Resource not found'
  });
});

