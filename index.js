import express from 'express';
import bodyParser from 'body-parser';
import hanhchinhvn from 'hanhchinhvn';

const app = express();

const PORT = 5000;

app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Server running on port: htttp://localhost:${PORT}`));

app.use(hanhchinhvn.json());