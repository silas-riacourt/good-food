import { IProduct } from '@/shared/model/product.model';
import { IRestaurant } from '@/shared/model/restaurant.model';

export interface ICategorie {
  id?: number;
  name?: string | null;
  description?: string | null;
  image?: string | null;
  products?: IProduct[] | null;
  restaurants?: IRestaurant[] | null;
}

export class Categorie implements ICategorie {
  constructor(
    public id?: number,
    public name?: string | null,
    public description?: string | null,
    public image?: string | null,
    public products?: IProduct[] | null,
    public restaurants?: IRestaurant[] | null
  ) {}
}
