import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { User } from "./user.entity";
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async create(login: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({
            login,
            password: hashedPassword,
        });

        console.log(`New User: ${newUser}`);
        return await this.userRepository.save(newUser);
    }

    async findOneByLogin(login: string): Promise<User> {
        return await this.userRepository.findOne({ where: { login } });
    }
}
