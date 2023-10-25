import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientRepo } from './patient.repo';
import { PersonRepo } from 'src/person/person.repo';

@Injectable()
export class PatientService {
  constructor(private readonly patientRepo: PatientRepo, private personRepo: PersonRepo) { }
  async create(createPatientDto: CreatePatientDto) {
    try {
      if (createPatientDto.companion.SSN === createPatientDto.patient.SSN)
        throw new BadRequestException("companion ssn is equal to patient ssn")
      return await this.patientRepo.createPatientWithVisit(createPatientDto)

    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      return await this.patientRepo.findAll();
    } catch (error) {
      throw error
    }
  }

  async findOne(ssn: string) {

    try {
      // should ask about it
      return await this.personRepo.findBySSN(ssn)
    } catch (error) {
      throw error
    }
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
