import { Injectable } from '@nestjs/common';
import { IOrderStatus } from '../common/interfaces/order-status.interface';

@Injectable()
export class PaymentService {
  randomOrderStatus(): IOrderStatus {
    const arr = [IOrderStatus.CONFIRMED, IOrderStatus.CANCELLED];

    return arr[Math.floor(Math.random() * arr.length)];
  }
}
