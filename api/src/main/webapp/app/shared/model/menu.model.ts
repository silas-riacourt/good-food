import { IItem } from '@/shared/model/item.model';
import { IRestaurant } from '@/shared/model/restaurant.model';
import { ICategorie } from '@/shared/model/categorie.model';

export interface IMenu {
  id?: number;
  name?: string | null;
  description?: string | null;
  price?: number | null;
  image?: string | null;
  items?: IItem[] | null;
  restaurants?: IRestaurant[] | null;
  categorie?: ICategorie | null;
}

export class Menu implements IMenu {
  constructor(
    public id?: number,
    public name?: string | null,
    public description?: string | null,
    public price?: number | null,
    public image?: string | null,
    public items?: IItem[] | null,
    public restaurants?: IRestaurant[] | null,
    public categorie?: ICategorie | null
  ) {}
}
