import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Companion, Patient, Person, PersonType, Prisma } from '@prisma/client';
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
      const visit = await this.prismaService.visit.update(
        {
          where: { code: updatePatientDto.visitCode },
          data: {
            patient: {
              update: {
                person: {
                  update: {
                    ...updatePatientDto.patient
                  }
                }
              }
            },
            companion: {
              update: {
                person: {
                  update: {
                    ...updatePatientDto.companion
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

  patientInclude: Prisma.PatientInclude = { visits: true, person: true, medicalRecords: true }
}
