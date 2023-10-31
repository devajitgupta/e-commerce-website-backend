import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IProductImage } from '../interfaces/image-interface';
export type ProductsDocument = Products & Document;

@Schema({ timestamps: true, collection: 'Products' })
export class Products {
  @Prop()
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  price: number;

  @Prop({ required: false })
  images: [
    {
      public_id: {
        type: string;
      };
      url: string;
    },
  ];
  @Prop({
    type: String, // Specify the data type as String
    required: [false, 'Please enter a product category'],
    enum: {
      values: [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Sports',
      ],
    },
  })
  category: string;

  @Prop({ required: false })
  seller: string;

  @Prop({ required: false })
  stock: number;

  @Prop({
    type: Number, // Specify the data type as Number
    default: 0,
  })
  ratings: number;

  @Prop({ required: false })
  reviews: [
    {
      rating: {
        type: Number;
      };
      comment: {
        type: String; // Use 'String' instead of 'string'
      };
      createdAt: {
        type: Date;
        default: Date;
      };
    },
  ];

  @Prop({
    type: Date, // Specify the data type as Number
    default: 0,
  })
  createdAt: Date;
}
export const ProductsSchema = SchemaFactory.createForClass(Products);
