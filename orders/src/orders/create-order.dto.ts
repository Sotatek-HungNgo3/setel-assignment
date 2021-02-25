import { IsNumber, Min } from 'class-validator';
import { IOrderStatus } from '../common/interfaces/order-status.interface';

export class CreateOrderDto {
  @IsNumber({}, { message: 'Total is not valid' })
  @Min(0, { message: 'Order total must better than 0' })
  readonly total: number;

  readonly userId: string;

  readonly status: IOrderStatus;
}
