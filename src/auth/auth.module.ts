/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../jwt.strategy/jwt.strategy';

@Module({
    imports: [
    PassportModule,
    JwtModule.register({
    secret: process.env.JWT_SECRET || 'defaultSecret',
    signOptions: { expiresIn: '1h'},
    }),
],
providers: [AuthService, JwtStrategy],
exports: [AuthService],
controllers: [AuthController],
})
export class AuthModule {}
