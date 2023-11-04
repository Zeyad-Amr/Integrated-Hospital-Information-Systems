import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PersonRepo } from './person.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PersonRepo, PrismaService],
})
export class PersonModule { }
