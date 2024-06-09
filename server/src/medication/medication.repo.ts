import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Prisma, Medication } from '@prisma/client';
import { CreateMedicationDto } from './dto/create-medication.dto';

@Injectable()
export class MedicationRepo extends PrismaGenericRepo<Medication> {
  constructor(private prismaService: PrismaService) {
    super('medication', prismaService);
  }

  async addMedication(data: CreateMedicationDto, creatorId: string) {
    try {
        const { patientId, ...medicationData } = data;
        const medication = await this.prismaService.medication.create({
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
                ...medicationData
            }
        });
        return medication;
    } catch (error) {
        throw error;
    }
  }

  includeObj: Prisma.MedicationInclude = {
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
