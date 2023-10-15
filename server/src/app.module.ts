import { Module } from '@nestjs/common';
import { StaffModule } from './staff/staff.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [StaffModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
