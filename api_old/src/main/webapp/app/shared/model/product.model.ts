import { IIngredient } from '@/shared/model/ingredient.model';
import { ICategorie } from '@/shared/model/categorie.model';

export interface IProduct {
  id?: number;
  name?: string | null;
  description?: string | null;
  price?: number | null;
  image?: string | null;
  ingredients?: IIngredient[] | null;
  categories?: ICategorie[] | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string | null,
    public description?: string | null,
    public price?: number | null,
    public image?: string | null,
    public ingredients?: IIngredient[] | null,
    public categories?: ICategorie[] | null
  ) {}
}
