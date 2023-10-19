import { SortOrder } from 'mongoose';

export interface IFindParams {
  populates?: string[];
  sortBy?: string;
  order?: SortOrder;
  limit?: number;
  skip?: number;
  _id?: string;
  user?: string;
}
export const DefaultFindParams: IFindParams = {
  sortBy: '_id',
  order: -1,
  limit: 20,
  skip: 0,
};
