import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientRepo } from './patient.repo';
import { PersonRepo } from 'src/person/person.repo';

@Injectable()
export class PatientService {
  constructor(private readonly patientRepo: PatientRepo, private personRepo: PersonRepo) { }


  async findAll() {
    try {
      return await this.patientRepo.findAll();
    } catch (error) {
      throw error
    }
  }

  async findOne(ssn: string) {

    try {
      return await this.patientRepo.findBySSN(ssn)
    } catch (error) {
      throw error
    }
  }

  update(updatePatientDto: UpdatePatientDto) {
    try {
      const updatedPatient = this.patientRepo.update(updatePatientDto);
      return "updated successfully"
    } catch (error) {
      throw error
    }
  }
}
