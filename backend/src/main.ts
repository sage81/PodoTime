import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Додаємо глобальні налаштування для кодування
  app.enableCors();
  app.use((req, res, next) => {
    res.charset = 'utf-8';
    next();
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap(); 