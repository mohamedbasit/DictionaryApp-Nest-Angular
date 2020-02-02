/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import Axios from "axios";
import { AppModule } from './app/app.module';
import { IncomingInterceptor } from './app/incoming.interceptor';
import { outgoingInterceptorSuccessHandler, outgoingInterceptorErrorHandler } from './app/outgoing.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalFilters(new IncomingInterceptor());

  Axios.interceptors.response.use(outgoingInterceptorSuccessHandler, outgoingInterceptorErrorHandler);

  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port);
  });
}

bootstrap();
