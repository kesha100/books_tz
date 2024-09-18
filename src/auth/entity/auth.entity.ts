import { UserEntity } from '../../user/entities/user.entity';

export class AuthEntity {
  user: UserEntity;
  accessToken: string;
}