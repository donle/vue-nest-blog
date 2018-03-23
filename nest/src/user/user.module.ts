import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.sechma';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ])
  ],
  controllers: [UserController],
  components: [UserService],
  exports: [UserService]
})
export class UserModule { }