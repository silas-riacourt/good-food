import { IRestaurant } from '@/shared/model/restaurant.model';
import { IIngredient } from '@/shared/model/ingredient.model';

export interface IStock {
  id?: number;
  quantity?: number | null;
  restaurant?: IRestaurant | null;
  ingredient?: IIngredient | null;
}

export class Stock implements IStock {
  constructor(
    public id?: number,
    public quantity?: number | null,
    public restaurant?: IRestaurant | null,
    public ingredient?: IIngredient | null
  ) {}
}
