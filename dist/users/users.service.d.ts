export declare class UsersService {
    private users;
    create(user: any): void;
    findAll(): any[];
    findOne(id: number): any;
    update(id: number, user: any): any;
    remove(id: number): {
        deleted: boolean;
    };
}
