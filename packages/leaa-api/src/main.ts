import path from 'path';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '@leaa/api/src/app.module';
import { TagService } from '@leaa/api/src/modules/tag/tag.service';
import { ConfigService } from '@leaa/api/src/modules/config/config.service';
import { LoggerService } from '@leaa/api/src/modules/logger/logger.service';
import { I18nextMiddleware } from '@leaa/api/src/middlewares';

import { envInfoForCli } from '@leaa/api/src/utils';

(async function bootstrap() {
  const logger = new Logger('App-Log');
  logger.log('App Launcher...', ' 🚀 ');

  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });

  const configService = await app.get(ConfigService);
  const publicPath = path.resolve(__dirname, `../${configService.PUBLIC_DIR}`);

  // app.useStaticAssets(publicPath);
  app.useStaticAssets(publicPath);
  app.useGlobalPipes(new ValidationPipe());

  app.disable('x-powered-by');
  app.enableCors({
    origin: true,
    credentials: true,
    maxAge: 0,
    optionsSuccessStatus: 200,
    exposedHeaders: ['Authorization'],
    // methods: '';
    // allowedHeaders: '';
    // preflightContinue: false;
  });

  app.use(I18nextMiddleware);

  await app.listen(configService.PORT);

  // ⚠️ sync all tags to file @ initApp
  const tagService = await app.get(TagService);
  await tagService.syncTagsToDictFile();

  envInfoForCli({
    config: configService,
    NODE_ENV: process.env.NODE_ENV,
    PUBLIC_PATH: publicPath,
    DIRNAME: __dirname,
  });
})();
