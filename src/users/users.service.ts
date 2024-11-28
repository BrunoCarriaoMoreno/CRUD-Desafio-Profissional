/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [];

    create(user: any) {
        this.users.push(user);
    }
    findAll() {
        return this.users;
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }

    update(id: number, user: any) {
        const existingUser = this.findOne(id);
        if (existingUser) {
            Object.assign(existingUser, user);
            return existingUser;
        }
        return null;
    }
    remove(id: number) {
        const index = this.users.findIndex(user => user.id === id);
        if (index >= 0) {
            this.users.splice(index, 1);
            return { deleted: true };
        }
        return { deleted: false };
    }
}

