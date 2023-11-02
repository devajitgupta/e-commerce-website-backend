import { Document } from 'mongoose';
import { IProductImage } from './image-interface';
import { IFindParams } from './utils-interface';

export interface IProduct extends Document {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly category: string;
  readonly images: IProductImage;
  readonly stockQuantity: Number;
}

export interface IFindProducts extends IFindParams {
  category?: string;
  ratings?: number;
  price?: { lte?: number; gte?: number };
}
