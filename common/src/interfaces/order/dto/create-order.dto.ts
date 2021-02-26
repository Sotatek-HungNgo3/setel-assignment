import { IsNumber, Min } from 'class-validator';
import { IOrderStatus } from '../order.interface';

export class CreateOrderDto {
  @IsNumber({}, { message: 'Total is not valid' })
  @Min(0, { message: 'Order total must better than 0' })
  total?: number;

  userId?: string;

  status?: IOrderStatus;
}
