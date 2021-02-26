import { HttpStatus, Inject } from '@nestjs/common';
import { Controller, Logger } from '@nestjs/common';
import {
  EventPattern,
  ClientProxy,
  MessagePattern,
} from '@nestjs/microservices';
import { IPaymentHandleRes } from '@setel-practical-assignment/common';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  private logger = new Logger('PaymentController');

  constructor(private readonly paymentService: PaymentService) {}

  // async onApplicationBootstrap() {
  //   await this.client.connect();
  // }

  // @EventPattern('order_created')
  // createOrder(data: any) {
  //   this.logger.log('Received data');
  //   data.status = this.paymentService.randomOrderStatus();

  //   this.logger.log('New order info: ', data);

  //   this.client.emit('order_updated', data);

  //   return data;
  // }

  @MessagePattern('payment_handle')
  async createdOrder(data: any): Promise<IPaymentHandleRes> {
    const randomOrderStatus = this.paymentService.randomOrderStatus();

    data.status = randomOrderStatus;

    return {
      status: HttpStatus.OK,
      errors: null,
      message: 'payment_handle_success',
      data: data,
    };
  }
}
