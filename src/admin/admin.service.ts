/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
    private admins = [];

    create(admin: { id: string; username: string; password: string}) {
        this.admins.push(admin);
        return { message: 'Admin criado com sucesso!', admin};
    }

    findAll() { 
        return this.admins;
    }
    findOne(id: string) {
        return this.admins.find(admin => admin.id ===id);
    }
    update(id: string, updateData: Partial<{ username: string; password: string}>) {
        const admin = this.findOne(id);
        if(!admin) throw new Error('Administrador não encontrado');
        Object.assign(admin, updateData);
        return { message: 'Administrador atualizado com sucesso!',admin};
    }

    remove(id: string) {
        const index = this.admins.findIndex(admin => admin.id ===id);
        if (index === -1) throw new Error('Administrador não encontrado');
        this.admins.splice(index, 1);
        return { message: 'Administrador removido com sucesso!'};
    }
}
