import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  page: number;

  @IsOptional()
  @IsPositive()
  limit: number;
}
