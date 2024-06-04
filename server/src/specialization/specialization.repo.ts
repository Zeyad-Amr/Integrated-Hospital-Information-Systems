import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma-client/prisma.service";
import { CreateSpecializationDto } from "./dto/create-specialization.dto";
import { UpdateSpecializationDto } from "./dto/update-specialization.dto";
import { PrismaGenericRepo } from "src/shared/services/prisma-client/prisma-generic.repo";
import { Prisma } from "@prisma/client";

@Injectable()
export class SpecializationRepo extends PrismaGenericRepo<SpecializationRepo> {
    constructor(private primsaService: PrismaService) {
        super('specialization', primsaService);
    }



    async createSpecialization(specialization: CreateSpecializationDto) {
        try {
            return await this.primsaService.specialization.create({
                data: {
                    name: specialization.name,
                    description: specialization.description
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number) {
        try {
            const res = await this.primsaService.specialization.findUnique({
                where: {
                    id: id
                },
                include: {
                    SubDepartment: true
                }
            });
            if (!res) {
                throw new NotFoundException("Specialization not found");
            }
            return res;
        } catch (error) {
            throw error;
        }
    }

    async updateSpecialization(id: number, specialization: UpdateSpecializationDto) {
        try {
            return await this.primsaService.specialization.update({
                where: {
                    id
                },
                data: {
                    name: specialization.name,
                    description: specialization.description
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async remove(id: number) {
        try {
            return await this.primsaService.specialization.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            throw error;
        }
    }
}