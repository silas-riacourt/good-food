import { IMenu } from '@/shared/model/menu.model';

export interface ICategorie {
  id?: number;
  name?: string | null;
  description?: string | null;
  image?: string | null;
  menus?: IMenu[] | null;
}

export class Categorie implements ICategorie {
  constructor(
    public id?: number,
    public name?: string | null,
    public description?: string | null,
    public image?: string | null,
    public menus?: IMenu[] | null
  ) {}
}
