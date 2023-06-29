import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports:[forwardRef(()=>AuthModule) ,TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService],
  exports:[UsersService],
  controllers:[UsersController]
})
export class UsersModule {}
