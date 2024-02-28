import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma-client/prisma.service";
import { CreateFeatureDto } from "./dto/create-feature.dto";
import { SubDepartmentRepo } from "src/subdepartment/subdepartment.repo";
import { UpdateFeatureDto } from "./dto/update-feature.dto";

@Injectable()
export class FeatureRepo {
    constructor(private prisma: PrismaService, private subdepartment: SubDepartmentRepo) { }
    async create(feature: CreateFeatureDto) {
        try {

            // check subdepartment existence
            if (feature.subDepartmentId) {
                const subDepartment = await this.subdepartment.findOne(feature.subDepartmentId);
            }
            return await this.prisma.feature.create({
                data: {
                    name: feature.name,
                    subDepartmentId: feature.subDepartmentId
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            return await this.prisma.feature.findMany({
                include: {
                    subDepartment: true,
                    Permissions: true
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number) {
        try {
            const res = await this.prisma.feature.findUnique({
                where: {
                    id
                },
                include: {
                    subDepartment: true,
                    Permissions: true
                }
            });
            if (!res) {
                throw new NotFoundException("Feature not found");
            }
            return res;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, feature: UpdateFeatureDto) {
        try {
            return await this.prisma.feature.update({
                where: {
                    id
                },
                data: {
                    name: feature.name,
                    subDepartmentId: feature.subDepartmentId
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.feature.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            throw error;
        }
    }

}