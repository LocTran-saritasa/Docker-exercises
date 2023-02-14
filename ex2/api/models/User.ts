import { client } from "../db";
import { UserDto } from "../dtos/user.dto";
import { UserMapper } from "../mappers/user.mapper";

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
        const users = await client.query<UserDto>('INSERT INTO Users(email, password) VALUES($1, $2) RETURNING *', [this.email, this.password])
        return UserMapper.fromDto(users.rows[0]);
    }

    public static async findByEmail (email: UserModel['email']): Promise<UserModel | null> {
        const users = await client.query<UserDto>('SELECT * FROM Users WHERE email = $1', [email])
        if (users.rowCount == 0) {
            return null;
        }
        return UserMapper.fromDto(users.rows[0]);
    }
}

type UserCreationData = Omit<UserModel, 'save' | 'findByEmail'>;
