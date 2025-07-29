import { 
  Controller, 
  Post, 
  Get, 
  Delete, 
  Body, 
  Query, 
  UseGuards,
  Request,
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common';
import { RecentSearchService } from '../../../application/usecase/recent-search.service';
import { SaveSearchDto } from '../../../application/dto/save-search.dto';
import { 
  RecentSearchResponseDto, 
  SearchAnalyticsResponseDto,
  SearchSuggestionsResponseDto
} from '../../../application/dto/recent-search-response.dto';
import { AuthGuard } from '../../../../auth/infrastructure/guard/auth.guard';

@Controller('search/recent')
export class RecentSearchController {
  constructor(
    private readonly recentSearchService: RecentSearchService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async saveSearch(
    @Request() req: any,
    @Body() saveSearchDto: SaveSearchDto,
  ): Promise<RecentSearchResponseDto> {
    try {
      const userId = req.user?.id;
      
      const recentSearch = await this.recentSearchService.saveSearch({
        query: saveSearchDto.query,
        userId,
        category: saveSearchDto.category,
        filters: saveSearchDto.filters,
        searchType: saveSearchDto.searchType || 'manual',
      });

      return new RecentSearchResponseDto({
        id: recentSearch.id,
        query: recentSearch.query,
        category: recentSearch.category,
        filters: recentSearch.filters,
        searchType: recentSearch.searchType,
        frequency: recentSearch.frequency,
        lastSearchedAt: recentSearch.lastSearchedAt,
        createdAt: recentSearch.createdAt,
      });
    } catch (error) {
      if (error.message?.includes('Search query')) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Failed to save search');
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async getRecentSearches(
    @Request() req: any,
    @Query('limit') limit?: string,
  ): Promise<RecentSearchResponseDto[]> {
    try {
      const userId = req.user?.id;
      const parsedLimit = limit ? parseInt(limit, 10) : 10;
      
      if (parsedLimit < 1 || parsedLimit > 50) {
        throw new BadRequestException('Limit must be between 1 and 50');
      }

      const recentSearches = await this.recentSearchService.getRecentSearches({
        userId,
        limit: parsedLimit,
      });

      return recentSearches.map(search => new RecentSearchResponseDto({
        id: search.id,
        query: search.query,
        category: search.category,
        filters: search.filters,
        searchType: search.searchType,
        frequency: search.frequency,
        lastSearchedAt: search.lastSearchedAt,
        createdAt: search.createdAt,
      }));
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to get recent searches');
    }
  }

  @Get('frequent')
  @UseGuards(AuthGuard)
  async getMostFrequentSearches(
    @Request() req: any,
    @Query('limit') limit?: string,
  ): Promise<RecentSearchResponseDto[]> {
    try {
      const userId = req.user?.id;
      const parsedLimit = limit ? parseInt(limit, 10) : 5;
      
      if (parsedLimit < 1 || parsedLimit > 20) {
        throw new BadRequestException('Limit must be between 1 and 20');
      }

      const frequentSearches = await this.recentSearchService.getMostFrequentSearches(
        userId,
        parsedLimit,
      );

      return frequentSearches.map(search => new RecentSearchResponseDto({
        id: search.id,
        query: search.query,
        category: search.category,
        filters: search.filters,
        searchType: search.searchType,
        frequency: search.frequency,
        lastSearchedAt: search.lastSearchedAt,
        createdAt: search.createdAt,
      }));
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to get frequent searches');
    }
  }

  @Get('analytics')
  @UseGuards(AuthGuard)
  async getSearchAnalytics(
    @Request() req: any,
  ): Promise<SearchAnalyticsResponseDto> {
    try {
      const userId = req.user?.id;
      
      const analytics = await this.recentSearchService.getSearchAnalytics({
        userId,
      });

      return new SearchAnalyticsResponseDto(analytics);
    } catch (error) {
      throw new InternalServerErrorException('Failed to get search analytics');
    }
  }

  @Get('suggestions')
  @UseGuards(AuthGuard)
  async getSearchSuggestions(
    @Request() req: any,
    @Query('q') query?: string,
    @Query('limit') limit?: string,
  ): Promise<SearchSuggestionsResponseDto> {
    try {
      if (!query || query.trim().length === 0) {
        return new SearchSuggestionsResponseDto([]);
      }

      const userId = req.user?.id;
      const parsedLimit = limit ? parseInt(limit, 10) : 5;
      
      if (parsedLimit < 1 || parsedLimit > 10) {
        throw new BadRequestException('Limit must be between 1 and 10');
      }

      const suggestions = await this.recentSearchService.getSearchSuggestions(
        userId,
        query.trim(),
        parsedLimit,
      );

      return new SearchSuggestionsResponseDto(suggestions);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to get search suggestions');
    }
  }

  @Delete()
  @UseGuards(AuthGuard)
  async clearRecentSearches(@Request() req: any): Promise<{ message: string }> {
    try {
      const userId = req.user?.id;
      
      await this.recentSearchService.clearRecentSearches(userId);
      
      return { message: 'Recent searches cleared successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to clear recent searches');
    }
  }
}