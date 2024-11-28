/* eslint-disable prettier/prettier */
import { Controller, Body, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt.strategy/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post()
    create(@Body() body: { username: string; password: string}) {
        const newAdmin = {
            id: Date.now().toString(),
            ...body,
        };
        return this.adminService.create(newAdmin);
    }

    @Get()
    findAll() {
        return this.adminService.findAll();
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
