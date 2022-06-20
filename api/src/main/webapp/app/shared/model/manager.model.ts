import { IUser } from '@/shared/model/user.model';
import { IRestaurant } from '@/shared/model/restaurant.model';

export interface IManager {
  id?: number;
  fullname?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  mail?: string | null;
  internalUser?: IUser | null;
  restaurant?: IRestaurant | null;
}

export class Manager implements IManager {
  constructor(
    public id?: number,
    public fullname?: string | null,
    public firstName?: string | null,
    public lastName?: string | null,
    public phone?: string | null,
    public mail?: string | null,
    public internalUser?: IUser | null,
    public restaurant?: IRestaurant | null
  ) {}
}
