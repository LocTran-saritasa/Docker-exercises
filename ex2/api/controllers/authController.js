import { userModel } from "../models/User.js";
import jwt from "jsonwebtoken"

const token_secret = 'saritasa'

class AuthController {
    async login(req, res, next) {
        const { email, password } = req.body
        const users = await userModel.getAll()

        const user = users.find(user => user.email === email && user.password === password)

        if (user == null) {
            return res.status(400).json({
                data: {
                    non_field_errors: ['Unable to log in with provided credentials.'],
                },
                detail: 'Unable to log in with provided credentials.',
            })
        }

        const token = jwt.sign({
            userId: user.id
        },
        token_secret,
        { expiresIn: '24h' })

        res.status(200).json({ token })
    }
}

export const authController = new AuthController();
