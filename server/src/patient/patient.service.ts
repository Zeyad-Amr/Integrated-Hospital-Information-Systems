import { Injectable } from '@nestjs/common';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientRepo } from './patient.repo';
import { PersonRepo } from 'src/person/person.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';

@Injectable()
export class PatientService {
  constructor(
    private readonly patientRepo: PatientRepo,
    private personRepo: PersonRepo,
  ) {}

  async findAll(pagination: Pagination, sort: Sorting, filters: Array<Filter>) {
    try {
      const additionalWhereConditions = [{ patientVisits: { some: {} } }];
      const includeObj = {
        CompanionsOnIncidents: true,
        companionVisits: true,
        patientVisits: true,
      };
      return await this.personRepo.getAll({
        paginationParams: pagination,
        filters,
        sort,
        additionalWhereConditions,
        include: includeObj,
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(ssn: string) {
    try {
      return await this.patientRepo.findBySSN(ssn);
    } catch (error) {
      throw error;
    }
  }

  async update(updatePatientDto: UpdatePatientDto) {
    try {
      await this.patientRepo.update(updatePatientDto);
      return 'updated successfully';
    } catch (error) {
      throw error;
    }
  }
}
