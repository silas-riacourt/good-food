import { IRestaurant } from '@/shared/model/restaurant.model';
import { IProductOrder } from '@/shared/model/product-order.model';
import { IClient } from '@/shared/model/client.model';

import { OrderStatus } from '@/shared/model/enumerations/order-status.model';
import { PaymentMethod } from '@/shared/model/enumerations/payment-method.model';
export interface IOrder {
  id?: number;
  name?: string | null;
  totalPrice?: number;
  date?: Date | null;
  status?: OrderStatus | null;
  paymentMethod?: PaymentMethod | null;
  restaurant?: IRestaurant | null;
  productOrders?: IProductOrder[] | null;
  client?: IClient | null;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public name?: string | null,
    public totalPrice?: number,
    public date?: Date | null,
    public status?: OrderStatus | null,
    public paymentMethod?: PaymentMethod | null,
    public restaurant?: IRestaurant | null,
    public productOrders?: IProductOrder[] | null,
    public client?: IClient | null
  ) {}
}
