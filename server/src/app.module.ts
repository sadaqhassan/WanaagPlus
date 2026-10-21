import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { PrismaService } from './prisma/prisma.service.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [AuthModule, PrismaModule],
  providers: [PrismaService],
})
export class AppModule {}
