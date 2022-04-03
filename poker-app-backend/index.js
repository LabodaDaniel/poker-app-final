import express from 'express';
import cors from 'cors';
import router from './root.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
const server = app.listen(5000, () => {
    console.log('listening on 5000');
})