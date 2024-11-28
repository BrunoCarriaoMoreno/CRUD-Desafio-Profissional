/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    private users = [];

    constructor(private readonly jwtService: JwtService) {}

    async validateUser(username: string, password: string,): Promise<any> {
    const user = this.users.find(user => user.username === username);
    if (!user) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return null;
    }
    return user;
}

async generateToken(user: { id: string; username: string}) {
    const payload = { sub: user.id, username: user.username };
    return {
        access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string) {
    const userExists = this.users.find(user => user.username === username);
    if(userExists) {
        throw new Error('Usuário ja cadastrado!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { id: Date.now().toString(), username, password: hashedPassword};
    this.users.push(newUser);
    return { message: 'Usuário registrado com sucesso!', user: newUser };
  }
}
