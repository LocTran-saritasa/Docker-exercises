import { client } from "../db";

export class UserModel {
    id: string | null;
    email: string;
    password: string;

    constructor(data: UserCreationData) {
        this.id = null;
        this.email = data.email;
        this.password = data.password;
    }

    public async save(): Promise<UserModel> {
        const users = await client.query<UserModel>('INSERT INTO Users(email, password) VALUES($1, $2) RETURNING *', [this.email, this.password])
        return users.rows[0];
    }

    public static async findByEmail (email: UserModel['email']): Promise<UserModel> {
        const users = await client.query<UserModel>('SELECT * FROM Users WHERE email = $1', [email])
        return users.rows[0];
    }
}

type UserCreationData = UserModel;
