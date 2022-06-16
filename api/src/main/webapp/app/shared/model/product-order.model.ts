import { IProduct } from '@/shared/model/product.model';
import { IOrder } from '@/shared/model/order.model';

export interface IProductOrder {
  id?: number;
  quantity?: number;
  totalPrice?: number;
  product?: IProduct;
  order?: IOrder | null;
}

export class ProductOrder implements IProductOrder {
  constructor(
    public id?: number,
    public quantity?: number,
    public totalPrice?: number,
    public product?: IProduct,
    public order?: IOrder | null
  ) {}
}
