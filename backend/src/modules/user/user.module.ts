import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserController } from './infrastructure/adapter/in/user.controller';
import { User } from './domain/entity/user.entity';
import { UserRepository } from './infrastructure/persistence/user.repository';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}