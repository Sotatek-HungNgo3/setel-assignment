import { IsNumber, Min, IsOptional } from 'class-validator';
import { IOrderStatus } from '../common/interfaces/order-status.interface';

export class UpdateOrderDto {
  @IsOptional()
  readonly total: number;

  @IsOptional()
  readonly userId: string;

  @IsOptional()
  readonly status: IOrderStatus;
}
