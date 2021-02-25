import { Inject } from '@nestjs/common';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, ClientProxy } from '@nestjs/microservices';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  private logger = new Logger('PaymentController');

  constructor(
    private readonly paymentService: PaymentService,
    @Inject('PAYMENT_SERVICE') private client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @EventPattern('order_created')
  createOrder(data: any) {
    this.logger.log('Received data');
    data.status = this.paymentService.randomOrderStatus();

    this.logger.log('New order info: ', data);

    this.client.emit('order_updated', data);

    return data;
  }
}
