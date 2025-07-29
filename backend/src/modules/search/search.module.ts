import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RecentSearch } from './domain/entity/recent-search.entity';
import { RecentSearchService } from './application/usecase/recent-search.service';
import { RecentSearchController } from './infrastructure/adapter/in/recent-search.controller';
import { RecentSearchRepository } from './infrastructure/persistence/recent-search.repository';
import { RecentSearchRepositoryInterface } from './domain/repository/recent-search-repository.interface';
import { User } from '../user/domain/entity/user.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([RecentSearch, User]),
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