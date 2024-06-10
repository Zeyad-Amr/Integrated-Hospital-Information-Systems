import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Prisma, PrimarySurvey } from '@prisma/client';
import { CreatePrimarySurveyDto } from './dto/create-primary-survey.dto';

@Injectable()
export class PrimarySurveyRepo extends PrismaGenericRepo<PrimarySurvey> {
  constructor(private prismaService: PrismaService) {
    super('primarySurvey', prismaService);
  }

  async addPrimarySurvey(data: CreatePrimarySurveyDto, creatorId: string) {
    try {
        const { visitCode, ...primarySurveyData } = data;
        const primarySurvey = await this.prismaService.primarySurvey.create({
            data: {
                visit: {
                    connect: {
                        code: visitCode
                    }
                },
                author: {
                    connect: {
                        id: creatorId
                    }
                },
                ...primarySurveyData
            }
        });
        return primarySurvey;
    } catch (error) {
        throw error;
    }
  }

  includeObj: Prisma.PrimarySurveyInclude = {
    author: {
      include: {
        subdepartments: true,
        role: true,
        shift: true,
        person: {
          include: {
            verificationMethod: true,
            gender: true,
            governate:true
          }
        }
      }
    }
  };
}
