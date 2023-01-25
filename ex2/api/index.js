import express from 'express';
import route from './routes/index.js';

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import { client, connectToDB } from './db/index.js';

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

connectToDB();
app.get('/', async (req, res, next) => {
    const users = await client.query('SELECT * FROM User')
    console.log(users)
    res.json(users.rows[0])
})

app.listen(port, () => {
    console.log("App listening at port: ", port);
})
