/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';
import { AdminModule } from './admin/admin.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [UsersModule,
  AuthModule,
  AdminModule,
  CacheModule.register({
    ttl: 5,
    max: 100,
  }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
