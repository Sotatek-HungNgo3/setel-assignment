import { Document } from 'mongoose';
import { IOrderStatus } from '../../common/interfaces/order-status.interface';

export interface IOrder extends Document {
  userId: string;
  total: number;
  status: IOrderStatus;
}
