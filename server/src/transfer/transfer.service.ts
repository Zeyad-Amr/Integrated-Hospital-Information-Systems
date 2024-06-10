import { Injectable } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { TransferRepo } from './transfer.repo';

@Injectable()
export class TransferService {
  constructor(private transferRepo: TransferRepo) {

  }
  async create(createTransferDto: CreateTransferDto, creatorId: string) {
    try {
      return await this.transferRepo.createTransfer(createTransferDto, creatorId)
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.transferRepo.getAll()
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} transfer`;
  }

  update(id: number, updateTransferDto: UpdateTransferDto) {
    return `This action updates a #${id} transfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} transfer`;
  }
}
