import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import {
  Prisma,
  ConsultationRequest,
  ConsultationStatus,
} from '@prisma/client';
import { CreateConsultationRequestDto } from './dto/create-consultation-request.dto';

@Injectable()
export class ConsultationRequestRepo extends PrismaGenericRepo<ConsultationRequest> {
  constructor(private prismaService: PrismaService) {
    super('consultationRequest', prismaService);
  }

  async addConsultationRequest(
    data: CreateConsultationRequestDto,
    creatorId: string,
  ) {
    try {
      const {
        patientId,
        visitCode,
        consultationSubdepartmentId,
        ...consultationRequestData
      } = data;
      const consultationRequest =
        await this.prismaService.consultationRequest.create({
          data: {
            patient: {
              connect: {
                id: patientId,
              },
            },
            visit: {
              connect: {
                code: visitCode,
              },
            },
            requester: {
              connect: {
                id: creatorId,
              },
            },
            consultationSubdepartment: {
              connect: {
                id: consultationSubdepartmentId,
              },
            },
            ...consultationRequestData,
          },
        });
      return consultationRequest;
    } catch (error) {
      throw error;
    }
  }

  async updateConsultationRequest(
    id: string,
    data: Prisma.ConsultationRequestUpdateInput,
    consultantId: string,
  ) {
    try {
      const consultationRequest =
        await this.prismaService.consultationRequest.update({
          where: {
            id,
          },
          data: {
            ...data,
            status: ConsultationStatus.COMPLETED,
            consultant: {
              connect: {
                id: consultantId,
              },
            },
          },
          include: this.includeObj,
        });
      return consultationRequest;
    } catch (error) {
      throw error;
    }
  }

  includeObj: Prisma.ConsultationRequestInclude = {
    patient: {
      include: {
        person: {
          include: {
            verificationMethod: true,
            gender: true,
            governate: true,
          },
        },
      },
    },
    requester: {
      include: {
        subdepartments: true,
        role: true,
        shift: true,
        person: {
          include: {
            verificationMethod: true,
            gender: true,
            governate: true,
          },
        },
      },
    },
    consultant: {
      include: {
        subdepartments: true,
        role: true,
        shift: true,
        person: {
          include: {
            verificationMethod: true,
            gender: true,
            governate: true,
          },
        },
      },
    },
  };
}
