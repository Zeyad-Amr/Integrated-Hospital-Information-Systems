import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma-client/prisma.service";
import { AssignFeatures, CreateSubdepartmentDto } from "./dto/create-subdepartment.dto";
import { UpdateSubdepartmentDto } from "./dto/update-subdepartment.dto";
import { RoomRepo } from "src/room/room.repo";
import { SpecializationRepo } from "src/specialization/specialization.repo";
import { Prisma } from "@prisma/client";

@Injectable()
export class SubDepartmentRepo {
    constructor(private prisma: PrismaService, private roomRepo: RoomRepo, private specializationRepo: SpecializationRepo) { }

    async create(body: CreateSubdepartmentDto) {
        try {

            // check room existence
            await this.roomRepo.findOne(body.roomId);

            // check specialization existence
            await this.specializationRepo.findOne(body.specializationId);

            // check department existence
            if (body.departmentId) {
                const department = await this.prisma.department.findUnique({
                    where: {
                        id: body.departmentId
                    }
                });
                if (!department) {
                    throw new NotFoundException("Department not found");
                }
            }

            const res = await this.prisma.subDepartment.create({
                data: {
                    name: body.name,
                    departmentId: body.departmentId ? body.departmentId : null,
                    roomId: body.roomId,
                    specializationId: body.specializationId,
                }
            });
            return res;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            return await this.prisma.subDepartment.findMany({
                include: {
                    Department: true,
                    features: true,
                    specialization: true,
                    room: true
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number) {
        try {
            const res = await this.prisma.subDepartment.findUnique({
                where: {
                    id
                },
                include: {
                    Department: true,
                    features: true,
                    specialization: true,
                    room: true
                }
            });
            if (!res) {
                throw new NotFoundException("SubDepartment not found");
            }
            return res;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, body: UpdateSubdepartmentDto) {
        try {
            return await this.prisma.subDepartment.update({
                where: {
                    id
                },
                data: {
                    name: body.name,
                    Department: {
                        connect: {
                            id: body.departmentId
                        }
                    },
                    room: {
                        connect: {
                            id: body.roomId
                        }
                    },
                    specialization: {
                        connect: {
                            id: body.specializationId
                        }
                    },
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.subDepartment.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async assignFeatures(id: number, body: AssignFeatures) {
        try {

            if (body.AddedFeatures.length != 0) {

                const featuresToAdd: Array<any> = [];
                for (let i = 0; i < body.AddedFeatures.length; i++) {
                    body.AddedFeatures[i].features.forEach((feature) => {
                        featuresToAdd.push({
                            featureId: feature,
                            subDepartmentId: id,
                            roleTypeId: body.AddedFeatures[i].roleId
                        });
                    });
                }

                await this.prisma.permissions.createMany({
                    data: featuresToAdd, skipDuplicates: true
                });
            }



            if (body.RemovedFeatures.length != 0) {

                const featuresToRemove: Array<any> = [];
                for (let i = 0; i < body.RemovedFeatures.length; i++) {
                    body.RemovedFeatures[i].features.forEach((feature) => {
                        featuresToRemove.push({
                            featureId: feature,
                            subDepartmentId: id,
                            roleTypeId: body.RemovedFeatures[i].roleId
                        });
                    });
                }

                await this.prisma.permissions.deleteMany({
                    where: {
                        OR: featuresToRemove
                    }
                });
            }

            return { message: "Features assigned successfully" };
        }
        catch (error) {
            throw error;
        }
    }
}