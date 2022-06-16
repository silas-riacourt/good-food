import { ISupplier } from '@/shared/model/supplier.model';
import { IProduct } from '@/shared/model/product.model';

import { IngredientOrderStatus } from '@/shared/model/enumerations/ingredient-order-status.model';
export interface IIngredientOrder {
  id?: number;
  date?: Date | null;
  status?: IngredientOrderStatus | null;
  supplifier?: ISupplier | null;
  product?: IProduct | null;
}

export class IngredientOrder implements IIngredientOrder {
  constructor(
    public id?: number,
    public date?: Date | null,
    public status?: IngredientOrderStatus | null,
    public supplifier?: ISupplier | null,
    public product?: IProduct | null
  ) {}
}
