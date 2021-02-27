import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  CreateOrderDto,
  IOrderCancelRes,
  IOrderCheckStatusRes,
  IOrderCreateRes,
  IOrderGetListRes,
  IOrderGetRes,
  IOrderStatus,
  IOrderUpdateRes,
  IPaymentHandleRes,
  PaginationQuery,
} from '@setel-practical-assignment/common';

@Controller('api/orders')
export class OrderController {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderSrvClient: ClientProxy,
    @Inject('PAYMENT_SERVICE') private readonly paymentSrvClient: ClientProxy,
  ) {}
  async onApplicationBootstrap() {
    await this.orderSrvClient.connect();
  }
  @Post()
  async createOrder(
    @Body() body: CreateOrderDto,
    @Req() req: any,
  ): Promise<IOrderCreateRes> {
    const newOrder: CreateOrderDto = {
      total: body.total,
      userId: req.user.id,
      status: IOrderStatus.CREATED,
    };
    const orderCreateRes: IOrderCreateRes = await this.orderSrvClient
      .send('order_create', newOrder)
      .toPromise();
    const handlePaymentRes: IPaymentHandleRes = await this.paymentSrvClient
      .send('payment_handle', orderCreateRes.data)
      .toPromise();
    const orderUpdateRes: IOrderUpdateRes = await this.orderSrvClient
      .send('order_update', handlePaymentRes.data)
      .toPromise();
    return {
      status: orderCreateRes.status,
      errors: orderCreateRes.errors,
      data: orderUpdateRes.data,
      message: orderCreateRes.message,
    };
  }
  @Put('/:id/cancel')
  async cancelledOrder(@Param('id') id: string): Promise<IOrderCancelRes> {
    const orderCancelRes: IOrderCancelRes = await this.orderSrvClient
      .send('order_cancel', { orderId: id })
      .toPromise();
    return {
      status: orderCancelRes.status,
      errors: orderCancelRes.errors,
      data: orderCancelRes.data,
      message: orderCancelRes.message,
    };
  }
  @Get('/:id')
  async getOrder(@Param('id') id: string): Promise<IOrderGetRes> {
    const orderGetRes: IOrderGetRes = await this.orderSrvClient
      .send('order_get_by_id', { orderId: id })
      .toPromise();
    return {
      status: orderGetRes.status,
      errors: orderGetRes.errors,
      data: orderGetRes.data,
      message: orderGetRes.message,
    };
  }
  @Get()
  async getOrderList(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<IOrderGetListRes> {
    const page =
      paginationQuery.page && typeof paginationQuery.page === 'string'
        ? parseInt(paginationQuery.page)
        : undefined;
    const limit =
      paginationQuery.limit && typeof paginationQuery.limit === 'string'
        ? parseInt(paginationQuery.limit)
        : undefined;
    const orderGetListRes: IOrderGetListRes = await this.orderSrvClient
      .send('order_get_list', { page, limit })
      .toPromise();
    return {
      status: orderGetListRes.status,
      errors: orderGetListRes.errors,
      data: orderGetListRes.data,
      message: orderGetListRes.message,
    };
  }
  @Get('/:id/status')
  async checkOrderStatus(
    @Param('id') id: string,
  ): Promise<IOrderCheckStatusRes> {
    const orderCheckStatusRes: IOrderCheckStatusRes = await this.orderSrvClient
      .send('order_check_status', { orderId: id })
      .toPromise();
    return {
      status: orderCheckStatusRes.status,
      errors: orderCheckStatusRes.errors,
      data: orderCheckStatusRes.data,
      message: orderCheckStatusRes.message,
    };
  }
}
