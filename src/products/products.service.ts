import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/common/dtos/products';
import { IProduct } from 'src/common/interfaces/products.interface';
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

  async getAllProducts() {
    const ProductData = await this.productsModel.find().exec();
    if (!ProductData || ProductData.length == 0) {
      throw new NotFoundException('Products data not found!');
    }
    return ProductData;
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
