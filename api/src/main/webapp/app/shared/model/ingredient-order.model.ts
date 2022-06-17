import { ISupplier } from '@/shared/model/supplier.model';
import { IIngredient } from '@/shared/model/ingredient.model';

import { IngredientOrderStatus } from '@/shared/model/enumerations/ingredient-order-status.model';
export interface IIngredientOrder {
  id?: number;
  date?: Date | null;
  status?: IngredientOrderStatus | null;
  quantity?: number | null;
  supplifier?: ISupplier | null;
  ingredient?: IIngredient | null;
}

export class IngredientOrder implements IIngredientOrder {
  constructor(
    public id?: number,
    public date?: Date | null,
    public status?: IngredientOrderStatus | null,
    public quantity?: number | null,
    public supplifier?: ISupplier | null,
    public ingredient?: IIngredient | null
  ) {}
}
