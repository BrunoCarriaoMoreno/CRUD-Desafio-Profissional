/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/jwt.strategy/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator'

@Controller('auth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('Register')
    async register(@Body() body: { username: string; password: string; role: string}) {
        return this.authService.register(body.username, body.password, body.role);
    }

    @Post('login')
    async login(@Body() body: { username: string; password: string}) {
        const user = await this.authService.validateUser(body.username, body.password);

        if (!user) {
            throw new Error('Credenciais inválidas!');
        }

        const token = await this.authService.generateToken(user);
        return token;
    }

    @Get('protected')
    @UseGuards(RolesGuard)
    @Roles('admin')
    getProtectedRoute() {
        return { message: 'Voce acessou uma rota protegida apenas para admins!' };
    }
    @Get('user-data')
    @Roles('user', 'admin')
    getUserData() {
        return { message: 'Voce acessou uma rota protegida para usuários e administradores!'}
    }
}
