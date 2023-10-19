import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './auth.controller';
import { UserRepo } from './auth.repo';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepo, PrismaService],
  exports: [UserService],
})
export class UserModule { }
