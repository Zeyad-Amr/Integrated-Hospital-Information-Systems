import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Person } from '@prisma/client';
import { PersonRepo } from 'src/person/person.repo';
import { VisitRepo } from 'src/visit/visit.repo';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientRepo {
  constructor(
    private prismaService: PrismaService,
    private readonly personRepo: PersonRepo,
    private readonly visitRepo: VisitRepo,
  ) {}

  async findBySSN(ssn: string) {
    try {
      return await this.prismaService.person.findFirst({
        where: { SSN: ssn },
        include: {
          patientVisits: true,
          CompanionsOnIncidents: true,
          companionVisits: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(updatePatientDto: UpdatePatientDto) {
    try {
      return await this.prismaService.$transaction(async (tx) => {
        const person = await this.personRepo.createIfNotExist(
          updatePatientDto.patient,
        );

        let companion: Person;
        if (updatePatientDto.companion) {
          companion = await this.personRepo.createIfNotExist(
            updatePatientDto.companion,
          );
        }

        return await tx.visit.update({
          where: {
            code: updatePatientDto.visitCode,
          },
          data: {
            patientId: person.id,
            companionId: companion?.id,
          },
        });
      });
    } catch (error) {
      throw error;
    }
  }
}
