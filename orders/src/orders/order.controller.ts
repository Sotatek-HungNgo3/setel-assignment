import {
  Controller,
  Get,
  Post,
  Put,
  Res,
  Query,
  HttpStatus,
  Param,
  Body,
  Req,
  Logger,
  Inject,
} from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { IOrderStatus } from '../common/interfaces/order-status.interface';
import { CreateOrderDto } from './create-order.dto';
import { OrderService } from './order.service';

@Controller('api/orders')
export class OrderController {
  private logger = new Logger('OrderController');

  constructor(
    private readonly orderService: OrderService,
    @Inject('ORDER_SERVICE') private client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Get()
  async getListOrder(@Query() paginationQuery: PaginationQueryDto) {
    const paginated = await this.orderService.getListOrder(paginationQuery);

    return paginated;
  }

  @Get('/:id')
  async getOrder(@Param('id') id: string) {
    const order = await this.orderService.getOrder(id);

    return order;
  }

  @Post()
  async createOrder(@Body() body: CreateOrderDto, @Req() req: any) {
    const data: CreateOrderDto = {
      userId: req.user.id,
      status: IOrderStatus.CREATED,
      total: body.total,
    };
    const order = await this.orderService.createOrder(data);

    this.client.emit('order_created', order);

    return order;
  }

  @Put('/cancelled/:id')
  async cancelledOrder(@Param('id') id: string) {
    const order = await this.orderService.cancelledOrder(id);
    return order;
  }

  @Get('/status/:id')
  async checkOrderStatus(@Param('id') id: string) {
    const orderStatus = await this.orderService.checkOrderStatus(id);

    return orderStatus;
  }

  @EventPattern('order_updated')
  async updateOrderByEvent(data: any) {
    this.logger.log('Received data');
    console.log(data);

    const updatedOrder = this.orderService.updateOrder(data.id, data);

    return updatedOrder;
  }
}
