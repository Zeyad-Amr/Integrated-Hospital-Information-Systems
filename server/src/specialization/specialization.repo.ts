import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma-client/prisma.service";
import { CreateSpecializationDto } from "./dto/create-specialization.dto";
import { UpdateSpecializationDto } from "./dto/update-specialization.dto";

@Injectable()
export class SpecializationRepo {
    constructor(private primsa: PrismaService) { }

    async create(specialization: CreateSpecializationDto) {
        try {
            return await this.primsa.specialization.create({
                data: {
                    name: specialization.name,
                    description: specialization.description
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            return await this.primsa.specialization.findMany({
                include: {
                    SubDepartment: true
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number) {
        try {
            const res = await this.primsa.specialization.findUnique({
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

    async update(id: number, specialization: UpdateSpecializationDto) {
        try {
            return await this.primsa.specialization.update({
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
            return await this.primsa.specialization.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            throw error;
        }
    }
}