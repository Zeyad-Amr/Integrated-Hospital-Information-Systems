import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Prisma, Prescription } from '@prisma/client';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';

@Injectable()
export class PrescriptionRepo extends PrismaGenericRepo<Prescription> {
  constructor(private prismaService: PrismaService) {
    super('prescription', prismaService);
  }

  async addPrescription(data: CreatePrescriptionDto, creatorId: string) {
    try {
        const { patientId, visitCode, ...prescriptionData } = data;
        const prescription = await this.prismaService.prescription.create({
            data: {
                patient: {
                    connect: {
                        id: patientId
                    }
                },
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
                ...prescriptionData
            }
        });
        return prescription;
    } catch (error) {
        throw error;
    }
  }

  includeObj: Prisma.PrescriptionInclude = {
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
