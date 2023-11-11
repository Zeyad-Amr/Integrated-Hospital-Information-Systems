import { Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { IncidentRepo } from './incident.repo';

@Injectable()
export class IncidentService {
  constructor(private readonly incidentRepo: IncidentRepo) { }
  create(createIncidentDto: CreateIncidentDto) {
    try {
      return this.incidentRepo.create(createIncidentDto);
    } catch (error) {
      throw error
    }
  }

  findAll() {

    try {
      return this.incidentRepo.getAll();
    } catch (error) {
      throw error
    }
   
  }

  findOne(id: string) {
    try {
      return this.incidentRepo.getById(id)
    } catch (error) {
      throw error
    }
  }

  update(id: number, updateIncidentDto: UpdateIncidentDto) {
    return `This action updates a #${id} incident`;
  }

  remove(id: number) {
    return `This action removes a #${id} incident`;
  }
}
