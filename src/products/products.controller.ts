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
import { FileInterceptor } from '@nestjs/platform-express';
import { customFilename } from 'src/common/interfaces/utils.function';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data') // Specify the content type for Swagger
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: customFilename, // Set the destination folder
      }),
    }),
  )
  async uploadProductImage(@UploadedFile() file): Promise<any> {
    try {
      // Handle the uploaded file here
      console.log('Uploaded file:', file);

      // You can add your logic to save or process the file here

      return { message: 'File uploaded successfully' };
    } catch (error) {
      return error;
    }
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
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
}
