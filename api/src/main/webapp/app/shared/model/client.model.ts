import { IUser } from '@/shared/model/user.model';
import { IOrder } from '@/shared/model/order.model';

export interface IClient {
  id?: number;
  fullname?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  mail?: string | null;
  user?: IUser;
  orders?: IOrder[] | null;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public fullname?: string | null,
    public firstName?: string | null,
    public lastName?: string | null,
    public phone?: string | null,
    public mail?: string | null,
    public user?: IUser,
    public orders?: IOrder[] | null
  ) {}
}
