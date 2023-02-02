import http from 'http'

import * as dotenv from 'dotenv'
dotenv.config()

import { connectToDB } from './db';
import { authController } from './controllers/authController';

const port = 8000 || process.env.PORT;

connectToDB();

const requestListener = (req: http.IncomingMessage, res: http.ServerResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, PATCH, DELETE");
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }
  if (req.url?.startsWith('/auth/login')) {
      authController.login(req, res);
  } else {
    res.statusCode = 404;
    return res.end();
  }
}

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
