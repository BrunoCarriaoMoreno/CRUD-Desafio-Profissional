import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(creatUserDto: any): void;
    findAll(): any[];
    findOne(id: number): any;
    update(id: number, updateUserDto: any): any;
    remove(id: number): {
        deleted: boolean;
    };
}
