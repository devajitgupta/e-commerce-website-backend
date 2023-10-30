import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from 'src/common/dtos/products';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { response } from 'express';
import { diskStorage } from 'multer';
import { Response } from 'express';

import { FileInterceptor } from '@nestjs/platform-express';
import { customFilename } from 'src/common/interfaces/utils.function';
import { ProductsDocument } from 'src/common/schemas';
import { join } from 'path';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiConsumes('multipart/form-data') // Specify the content type for Swagger
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: customFilename, // Set the destination folder
      }),
    }),
  )
  async uploadProductImage(
    @UploadedFile() image,
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductsDocument> {
    try {
      if (image) {
        createProductDto.image = image.filename;
      }
      console.log(createProductDto);

      return this.productsService.createProduct(createProductDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  async findAll() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.getProductById(id);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.UpdateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.productsService.removeProduct(id);
  }

  @Get('upload/:filename')
  async findReceipt(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const fileBuffer = await this.productsService.getProductImage(filename);
      if (!fileBuffer) {
        return res.status(404).send('File not found');
      }
      // Set appropriate response headers based on the file type
      res.set({
        'Content-Type': 'application/octet-stream', // Change to the appropriate MIME type if needed
        'Content-Length': fileBuffer.length.toString(), // Convert to string
        'Content-Disposition': `image; filename="${filename}"`,
      });
      // Return the file as a buffer
      return res.send(fileBuffer);
    } catch (err) {
      // Handle errors
      console.log(err);
      return res.status(500).send('Internal Server Error');
    }
  }
}
