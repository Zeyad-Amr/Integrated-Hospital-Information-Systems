import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import {  Prisma, Vitals } from '@prisma/client';
import { CreateVitalDto } from './dto/create-vital.dto';

@Injectable()
export class VitalsRepo extends PrismaGenericRepo<Vitals> {
  constructor(private prismaService: PrismaService) {
    super('vitals', prismaService);
  }

  async addVitals(data:CreateVitalDto,creatorId:string) {
    try {
        const {patientId,visitCode,...vitalsData}=data
        const vitals = await this.prismaService.vitals.create({
            data:{
                patient:{
                    connect:{
                        id:patientId
                    }
                },
                visit:{
                    connect:
                    {code:visitCode}
                },
                author:{
                    connect:{
                        id:creatorId
                    }
                },
                ...vitalsData
            }
        })
        return vitals
    } catch (error) {
        throw error
    }
  }
//   async update(
//     vitalsname: string,
//     item: Prisma.VitalsUpdateInput,
//   ): Promise<Vitals | null> {
//     try {
//       const res = await this.prismaService.vitals.update({ });
//       return res;
//     } catch (error) {
//       throw error;
//     }
//   }
includeObj: Prisma.VitalsInclude = {
    patient:{include:{person: { include: { verificationMethod: true, gender: true } }}},
    author:{
        include:{
        subdepartments: true,
        role: true,
        shift: true,
        person: { include: { verificationMethod: true, gender: true } }
    }}
  };
}
