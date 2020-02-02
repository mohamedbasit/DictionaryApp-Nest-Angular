import { Module, HttpModule } from '@nestjs/common';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import  {configuration}  from "./app.config";
@Module({
  imports: [
    /**
     * TODO: Need to add middleware to filter based on file extensions
     * @description
     * Serving angular application from nest server itself
     */
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'dist', 'apps', 'dictionary'),
    }),
    /**
     * Pull configuration from environment file.
     * @description
     * Using dotenv package
     * ignoreEnvFile: true by enabling this flag, get config from env variable
     */
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
