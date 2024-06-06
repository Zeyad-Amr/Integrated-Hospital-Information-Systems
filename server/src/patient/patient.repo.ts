import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Companion, Patient, Person,  Prisma } from '@prisma/client';
import { VisitRepo } from 'src/visit/visit.repo';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaGenericRepo } from 'src/shared/services/prisma-client/prisma-generic.repo';
import { PersonRepo } from 'src/person/person.repo';

@Injectable()
export class PatientRepo extends PrismaGenericRepo<Patient> {
  constructor(
    private prismaService: PrismaService,
    private readonly visitRepo: VisitRepo,
    private readonly personRepo: PersonRepo,
  ) {
    super('patient', prismaService);
  }

  async findBySSN(ssn: string) {
    try {
      const pat = await this.prismaService.patient.findFirst({
        where: { person: { SSN: ssn } },
        include: this.patientInclude,
      });
      if (!pat)
        return new NotFoundException()
    } catch (error) {
      throw error;
    }
  }

  async updateUncompleted(updatePatientDto: UpdatePatientDto) {
    try {
      const { verificationMethodId, genderId, governateId, ...personData } = updatePatientDto.patient
      const visit = await this.prismaService.visit.update(
        {
          where: { code: updatePatientDto.visitCode },
          data: {
            patient: {
              upsert: {
                create:{
                  person:{
                    create:{
                      verificationMethod: verificationMethodId ? { connect: { id: verificationMethodId } } : undefined,
                      governate: governateId ? { connect: { id: governateId } } : undefined,
                      gender: genderId ? { connect: { id: genderId } } : undefined,
                      ...personData
                    }
                  }
                },
                update:{
                  person: {
                    update: {
                      verificationMethod: verificationMethodId ? { connect: { id: verificationMethodId } } : undefined,
                      governate: governateId ? { connect: { id: governateId } } : undefined,
                      gender: genderId ? { connect: { id: genderId } } : undefined,
                      ...personData
                    }
                  }
                }
              }
            }
          }
        }
      )
      return visit
    } catch (error) {
      throw error;
    }
  }

  patientInclude: Prisma.PatientInclude = { visits: true, person: true }
}
