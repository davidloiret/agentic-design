import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RecentSearch } from './domain/entity/recent-search.entity';
import { RecentSearchService } from './application/usecase/recent-search.service';
import { RecentSearchController } from './infrastructure/adapter/in/recent-search.controller';
import { RecentSearchRepository } from './infrastructure/persistence/recent-search.repository';
import { User } from '../user/domain/entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([RecentSearch, User]),
    AuthModule,
    UserModule,
  ],
  controllers: [RecentSearchController],
  providers: [
    RecentSearchService,
    {
      provide: 'RecentSearchRepositoryInterface',
      useClass: RecentSearchRepository,
    },
  ],
  exports: [RecentSearchService],
})
export class SearchModule {}