import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { userProvider } from './user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  components: [UserService, ...userProvider],
  exports: [UserService]
})
export class UserModule { }