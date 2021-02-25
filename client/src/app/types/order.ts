export enum IOrderStatus {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
}

export interface Order {
  id: string;
  total: number;
  status: IOrderStatus;
}
