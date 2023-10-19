import { Document } from 'mongoose';
import { IProductImage } from './image-interface';

export interface IProduct extends Document {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly category: string;
  readonly images: IProductImage;
  readonly stockQuantity: Number;
}
