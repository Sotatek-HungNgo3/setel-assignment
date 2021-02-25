import { UpdateOrderDto } from './update-order.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PaginationResponse } from '../common/interfaces/pagination-response.interface';
import { IOrderStatus } from '../common/interfaces/order-status.interface';
import { CreateOrderDto } from './create-order.dto';
import { IOrder } from './interfaces/order.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<IOrder>,
  ) {}

  async getListOrder(
    query: PaginationQueryDto,
  ): Promise<PaginationResponse<IOrder>> {
    const { page = 1, limit = 10 } = query;

    const paginated: any = await (this.orderModel as any).paginate(
      {},
      { page, limit },
    );

    return {
      docs: paginated.docs,
      totalDocs: paginated.totalDocs,
      totalPages: paginated.totalPages,
      page: paginated.page,
      limit: paginated.limit,
    };
  }

  async getOrder(id: string): Promise<IOrder> {
    try {
      const order = await this.orderModel.findById(id);

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      return order;
    } catch (err) {
      throw new NotFoundException('Order not found');
    }
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const newOrder = new this.orderModel(createOrderDto);

    await newOrder.save();

    return newOrder;
  }

  async checkOrderStatus(id: string): Promise<IOrderStatus> {
    try {
      const order = await this.orderModel.findById(id);

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      return order.status;
    } catch (err) {
      throw new NotFoundException('Order not found');
    }
  }

  async updateOrder(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<IOrder> {
    const order = await this.orderModel.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = updateOrderDto.status || order.status;
    order.userId = updateOrderDto.userId || order.userId;
    order.total = updateOrderDto.total || order.total;
    await order.save();

    return order;
  }

  async cancelledOrder(id: string): Promise<IOrder> {
    const order = await this.orderModel.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = IOrderStatus.CANCELLED;
    await order.save();

    return order;
  }
}
