import { ISupplier } from '@/shared/model/supplier.model';
import { IStock } from '@/shared/model/stock.model';
import { IProduct } from '@/shared/model/product.model';

export interface IIngredient {
  id?: number;
  name?: string | null;
  quantity?: number | null;
  suppliers?: ISupplier[] | null;
  stocks?: IStock[] | null;
  products?: IProduct[] | null;
}

export class Ingredient implements IIngredient {
  constructor(
    public id?: number,
    public name?: string | null,
    public quantity?: number | null,
    public suppliers?: ISupplier[] | null,
    public stocks?: IStock[] | null,
    public products?: IProduct[] | null
  ) {}
}
