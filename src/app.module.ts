import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [UsersModule, AuthModule, AdminModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
