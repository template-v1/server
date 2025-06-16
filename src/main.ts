import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

function getServerIps(): string[] {
  const interfaces = os.networkInterfaces();
  const ips: string[] = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]!) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }

  return ips;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const ips = getServerIps();
  console.log('Server IPs:', ips.join(', '));

  const port = process.env.PORT ?? 3000;

  app.enableCors({
    origin: process.env.ALLOW_ORIGIN?.split(',') || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}

bootstrap();
