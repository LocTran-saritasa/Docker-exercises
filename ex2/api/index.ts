import http from 'http'

import * as dotenv from 'dotenv'
dotenv.config()

import { connectToDB } from './db';
import { authController } from './controllers/authController';

const port = 8000 || process.env.PORT;

connectToDB();

const requestListener = (request: http.IncomingMessage, response: http.ServerResponse) => {
    if (request.method === 'POST' && request.url === '/login') {
        authController.login(request, response);
      } else {
        response.statusCode = 404;
        response.end();
      }
  }
const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
