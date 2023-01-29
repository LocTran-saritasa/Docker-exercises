import { client } from "../db/index.js";

class UserModel {
    async getAll () {
        const usersQuery = await client.query('SELECT * FROM Users')
        return usersQuery.rows
    }
}

export const userModel = new UserModel()
