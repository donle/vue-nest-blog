import { Connection } from 'mongoose';
import { UserSchema } from './user.sechma';

export const userProvider = [
  {
    provide: 'UserModelToken',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DbConnectionToken'],
  },
];