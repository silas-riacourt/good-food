import { ICategorie } from '@/shared/model/categorie.model';
import { IManager } from '@/shared/model/manager.model';
import { IStock } from '@/shared/model/stock.model';
import { IOrder } from '@/shared/model/order.model';

export interface IRestaurant {
  id?: number;
  name?: string | null;
  locationName?: string | null;
  description?: string | null;
  schedule?: string | null;
  open?: boolean | null;
  locationLat?: number | null;
  locationLng?: number | null;
  categories?: ICategorie[] | null;
  manager?: IManager | null;
  stock?: IStock | null;
  order?: IOrder | null;
}

export class Restaurant implements IRestaurant {
  constructor(
    public id?: number,
    public name?: string | null,
    public locationName?: string | null,
    public description?: string | null,
    public schedule?: string | null,
    public open?: boolean | null,
    public locationLat?: number | null,
    public locationLng?: number | null,
    public categories?: ICategorie[] | null,
    public manager?: IManager | null,
    public stock?: IStock | null,
    public order?: IOrder | null
  ) {
    this.open = this.open ?? false;
  }
}
