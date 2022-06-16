import { IIngredient } from '@/shared/model/ingredient.model';

export interface ISupplier {
  id?: number;
  name?: string | null;
  description?: string | null;
  number?: string | null;
  address?: string | null;
  ingredient?: IIngredient | null;
}

export class Supplier implements ISupplier {
  constructor(
    public id?: number,
    public name?: string | null,
    public description?: string | null,
    public number?: string | null,
    public address?: string | null,
    public ingredient?: IIngredient | null
  ) {}
}
