import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { KnowledgeBaseController } from './infrastructure/adapter/in/knowledge-base.controller';
import { CollectionController } from './infrastructure/adapter/in/collection.controller';
import { WorkspaceController } from './infrastructure/adapter/in/workspace.controller';
import { KnowledgeBaseService } from './application/usecase/knowledge-base.service';
import { CollectionService } from './application/usecase/collection.service';
import { KnowledgeBaseRepository } from './infrastructure/persistence/knowledge-base.repository';
import { KnowledgeBaseItem } from './domain/entity/knowledge-base-item.entity';
import { User } from '../user/domain/entity/user.entity';
import { Workspace } from './domain/entity/workspace.entity';
import { Collection } from './domain/entity/collection.entity';
import { WorkspaceRepository } from './infrastructure/persistence/workspace.repository';
import { CollectionRepository } from './infrastructure/persistence/collection.repository';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([KnowledgeBaseItem, User, Workspace, Collection]),
    AuthModule,
    UserModule,
  ],
  controllers: [KnowledgeBaseController, CollectionController, WorkspaceController],
  providers: [KnowledgeBaseService, CollectionService, KnowledgeBaseRepository, WorkspaceRepository, CollectionRepository],
  exports: [KnowledgeBaseService, CollectionService],
})
export class UserKnowledgeBaseModule {}