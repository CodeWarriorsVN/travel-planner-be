import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/routes.js';

const app = express();

const PORT = 5000;

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS)

app.get('/hello', (req, res) => { res.send("Hello")});

app.use(express.json());

app.use(bodyParser.json());

app.use('/app', router);

app.use(cors());

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));