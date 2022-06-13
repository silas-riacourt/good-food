import { IMenu } from '@/shared/model/menu.model';

export interface IItem {
  id?: number;
  name?: string | null;
  description?: string | null;
  price?: number | null;
  image?: string | null;
  menu?: IMenu | null;
}

export class Item implements IItem {
  constructor(
    public id?: number,
    public name?: string | null,
    public description?: string | null,
    public price?: number | null,
    public image?: string | null,
    public menu?: IMenu | null
  ) {}
}
