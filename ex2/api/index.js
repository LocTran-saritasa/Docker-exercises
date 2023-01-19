import express from 'express';
import route from './routes/index.js';

import dotenv from 'dotenv';
dotenv.config();

const port = 8000 || process.env.PORT;
const app  = express();

// Middleware: read body of post method
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// router
route(app);

app.get('/', (req, res, next) => {
    res.send('API')
})

app.listen(port, () => {
    console.log("App listening at port: ", port);
})
