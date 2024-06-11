import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Prisma, Image } from '@prisma/client';
import { CreateRadiologyImageDto } from './dto/create-radiology-image.dto';

@Injectable()
export class RadiologyImageRepo extends PrismaGenericRepo<Image> {
  constructor(private prismaService: PrismaService) {
    super('image', prismaService);
  }

  async addRadiologyImage(data: CreateRadiologyImageDto, creatorId: string) {
    try {
        const { patientId, visitCode, ...radiologyImageData } = data;
        const radiologyImage = await this.prismaService.image.create({
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
                ...radiologyImageData
            }
        });
        return radiologyImage;
    } catch (error) {
        throw error;
    }
  }

  includeObj: Prisma.ImageInclude = {
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
    }
  };
}
