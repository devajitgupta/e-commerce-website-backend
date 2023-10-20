import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { ProductsService } from './products/products.service';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      dest: 'uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to the static files directory
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.development'],
    }),
    MongooseModule.forRoot(
      'mongodb+srv://ajitgupta9211:8604564523@cluster0.yjvmd.mongodb.net/Products?retryWrites=true&w=majority',
    ),
    AuthModule,
    UserModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
