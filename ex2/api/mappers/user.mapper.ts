import { UserDto } from "../dtos/user.dto";
import { UserModel } from "../models/User";

export namespace UserMapper {
    export function fromDto(dto: UserDto): UserModel {
        return new UserModel({
            id: dto.id,
            email: dto.email,
            password: dto.password,
        })
    }
}
