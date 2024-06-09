import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Prisma, Allergy } from '@prisma/client';
import { CreateAllergyDto } from './dto/create-allergy.dto';

@Injectable()
export class AllergyRepo extends PrismaGenericRepo<Allergy> {
  constructor(private prismaService: PrismaService) {
    super('allergy', prismaService);
  }

  async addAllergy(data: CreateAllergyDto, creatorId: string) {
    try {
        const { patientId, ...allergyData } = data;
        const allergy = await this.prismaService.allergy.create({
            data: {
                patient: {
                    connect: {
                        id: patientId
                    }
                },
                referedBy: {
                    connect: {
                        id: creatorId
                    }
                },
                ...allergyData
            }
        });
        return allergy;
    } catch (error) {
        throw error;
    }
  }

  includeObj: Prisma.AllergyInclude = {
    patient: {
      include: {
        person: {
          include: {
            verificationMethod: true,
            gender: true,
            governate:true
          }
        }
      }
    },
    referedBy: {
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
