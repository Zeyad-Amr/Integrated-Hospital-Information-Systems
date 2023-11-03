import { BadRequestException, Injectable } from '@nestjs/common';
import { AnonymousVisitDto, CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { VisitRepo } from './visit.repo';

@Injectable()
export class VisitService {
  constructor(private readonly visitRepo: VisitRepo) { }
  async create(createVisitDto: CreateVisitDto) {
    try {

      if (createVisitDto.companion && createVisitDto.companion.SSN === createVisitDto.patient.SSN)
        throw new BadRequestException("companion ssn is equal to patient ssn")
      return await this.visitRepo.createPatientWithVisit(createVisitDto)

    } catch (error) {
      throw error
    }
  }

  async createAnonymous(anonymousVisitDto: AnonymousVisitDto) {
    try {
      return await this.visitRepo.createAnonymous(anonymousVisitDto)
    } catch (error) {
      throw error
    }
  }

  // filters
  findAll() {
    return `This action returns all visit`;
  }


  findOne(visitCode: string) {
    try {
      return this.visitRepo.findByVisitCode(visitCode)
    } catch (error) {

    }
  }

}
