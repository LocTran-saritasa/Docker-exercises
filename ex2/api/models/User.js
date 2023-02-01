import { client } from "../db/index.js";

export class UserModel {
    email;
    password

    async getAll () {
        const usersQuery = await client.query('SELECT * FROM Users')
        return usersQuery.rows
    }
}
