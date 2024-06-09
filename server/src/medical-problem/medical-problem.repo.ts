import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Prisma, MedicalProblem } from '@prisma/client';
import { CreateMedicalProblemDto } from './dto/create-medical-problem.dto';

@Injectable()
export class MedicalProblemRepo extends PrismaGenericRepo<MedicalProblem> {
  constructor(private prismaService: PrismaService) {
    super('medicalProblem', prismaService);
  }

  async addMedicalProblem(data: CreateMedicalProblemDto, creatorId: string) {
    try {
        const { patientId, ...medicalProblemData } = data;
        const medicalProblem = await this.prismaService.medicalProblem.create({
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
                ...medicalProblemData
            }
        });
        return medicalProblem;
    } catch (error) {
        throw error;
    }
  }

  includeObj: Prisma.MedicalProblemInclude = {
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
