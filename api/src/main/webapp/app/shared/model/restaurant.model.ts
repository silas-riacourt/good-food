import { IMenu } from '@/shared/model/menu.model';

export interface IRestaurant {
  id?: number;
  name?: string | null;
  locationName?: string | null;
  open?: boolean | null;
  locationLat?: number | null;
  locationLng?: number | null;
  menus?: IMenu[] | null;
}

export class Restaurant implements IRestaurant {
  constructor(
    public id?: number,
    public name?: string | null,
    public locationName?: string | null,
    public open?: boolean | null,
    public locationLat?: number | null,
    public locationLng?: number | null,
    public menus?: IMenu[] | null
  ) {
    this.open = this.open ?? false;
  }
}
