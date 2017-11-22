import express from 'express';
import router from './api';

const app = express();
const port = process.env.PORT || 8099;

app.use('/', router);

app.listen(
    port,
    () => console.log(`Example app listening on http://localhost:${port}`)
);
