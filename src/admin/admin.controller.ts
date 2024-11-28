/* eslint-disable prettier/prettier */
import { Controller, Body, Get, Param, Patch, Post, Delete, Inject } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt.strategy/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
) {}

    @Post()
    create(@Body() body: { username: string; password: string}) {
        const newAdmin = {
            id: Date.now().toString(),
            ...body,
        };
        return this.adminService.create(newAdmin);
    }

    @Get()
    async findAll() {
        const cachedAdmins = await this.cacheManager.get('admin_list');
        if (cachedAdmins) {
            return cachedAdmins;
        }
        const admins = await this.adminService.findAll();

        await this.cacheManager.set('admin_list', admins, { ttl: 10});
        return admins;
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.adminService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateData: Partial<{ username: string; password: string }>,
    ) {
        return this.adminService.update(id, updateData);
    }

    @Delete('id')
    remove(@Param('id') id: string) {
        return this.adminService.remove(id);
    }
}
