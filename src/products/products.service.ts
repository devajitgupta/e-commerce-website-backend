import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/common/dtos/products';
import {
  IFindProducts,
  IProduct,
} from 'src/common/interfaces/products.interface';
import { Model } from 'mongoose';
import { ProductsDocument } from 'src/common/schemas/products.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from 'src/common/schemas/products.schema';
import * as path from 'path'; // Import the 'path' module
import * as fs from 'fs-extra';
import { IProductImage } from 'src/common/interfaces/image-interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: Model<ProductsDocument>,
  ) {}
  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductsDocument | null> {
    const newProduct = await new this.productsModel(createProductDto);
    return newProduct.save();
  }
  async UpdateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductsDocument> {
    return await this.productsModel.findByIdAndUpdate(id, updateProductDto);
  }

  async findAll(
    params: IFindProducts,
  ): Promise<{ products: ProductsDocument[] | []; count: number }> {
    const query = this.productsModel.find();
    const countQuery = this.productsModel.find();
    if (params.category) {
      query.where('category').equals(params.category);
      countQuery.where('category').equals(params.category);
    }
    if (params.ratings) {
      query.where('ratings').equals(params.ratings);
      countQuery.where('ratings').equals(params.ratings);
    }
    if (params.price) {
      query.where('price').lte(params.price.lte);

      countQuery.where('price').equals(params.price);
    }
    const [products, count] = await Promise.all([
      query.exec(),
      countQuery.countDocuments(),
    ]);
    // ad pagination
    if (params.limit) {
      query.limit(params.limit);
    }
    if (params.skip) {
      query.skip(params.skip);
    }
    return { products, count };
  }

  async getProductById(id) {
    return await this.productsModel.findById(id);
  }

  async removeProduct(id: string) {
    return await this.productsModel.findByIdAndRemove(id);
  }

  // for image upload

  async updateProductImage(
    productId: string,
    { originalname, filename, mimetype }: IProductImage,
  ) {
    return await this.productsModel.updateOne(
      { _id: productId },
      {
        i: {
          originalname: originalname,
          filename: filename,
          mimetype: mimetype,
        },
      },
      { new: true },
    );
  }

  async getProductImage(filename: string): Promise<Buffer> {
    const filePath = path.join(__dirname, '../', '../', 'uploads', filename);
    const fileBuffer = await fs.readFile(filePath);
    return fileBuffer;
  }
}
