import { userModel } from "../models/User.js";

class UserController {
    async getAllUser(req, res, next) {
        const users = await userModel.getAll()
        res.status(200).json(users)
    }
}

export const userController = new UserController();
