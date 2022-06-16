import { IProduct } from '@/shared/model/product.model';

export interface IProductOrder {
  id?: number;
  quantity?: number;
  totalPrice?: number;
  product?: IProduct;
}

export class ProductOrder implements IProductOrder {
  constructor(public id?: number, public quantity?: number, public totalPrice?: number, public product?: IProduct) {}
}
