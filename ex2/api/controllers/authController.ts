import { IncomingMessage, ServerResponse } from "http"
import jwt from "jsonwebtoken"
import { UserModel } from '../models/User';

const token_secret = 'saritasa'

class AuthController {
    login(req: IncomingMessage, res: ServerResponse) {
        const body: Uint8Array[] = [];
        req.on('data', (chunk: Uint8Array) => {
          body.push(chunk);
        }).on('end', async () => {
          const { email, password } = JSON.parse(Buffer.concat(body).toString());

          const user = await UserModel.findByEmail(email)
  
          if (user == null || user.password !== password) {
            res.statusCode = 400
            return res.end(JSON.stringify({
                data: {
                    non_field_errors: ['Unable to log in with provided credentials.'],
                },
                detail: 'Unable to log in with provided credentials.',
            }))
          }
  
          const token = jwt.sign({
              userId: user.id
          },
          token_secret,
          { expiresIn: '24h' })
  
          res.statusCode = 200
          return res.end(JSON.stringify({ token }))
        });

    }
}

export const authController = new AuthController();
