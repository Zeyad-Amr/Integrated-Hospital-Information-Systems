import { Injectable, NotFoundException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PrismaService } from "src/shared/services/prisma-client/prisma.service";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { FeatureRepo } from "src/feature/feature.repo";
import { SubDepartmentRepo } from "src/subdepartment/subdepartment.repo";

@Injectable()
@ApiTags('Permission')
export class PermissionRepo {
    constructor(private prisma: PrismaService) { }

    async create(permission: CreatePermissionDto) {
        try {
            // check feature existence
            const feature = await this.prisma.feature.findUnique({
                where: {
                    id: permission.featureId
                }
            });
            if (!feature) {
                throw new NotFoundException("Feature not found");
            }

            if (feature.subDepartmentId !== permission.subdepartmentId) {
                throw new NotFoundException("Feature does not belong to the subdepartment");
            }

            // check role existence
            const role = await this.prisma.roleType.findUnique({
                where: {
                    id: permission.roleId
                }
            });
            if (!role) {
                throw new NotFoundException("Role not found");
            }

            // check subdepartment existence
            const subDepartment = await this.prisma.subDepartment.findUnique({
                where: {
                    id: permission.subdepartmentId
                }
            });
            if (!subDepartment) {
                throw new NotFoundException("SubDepartment not found");
            }

            return await this.prisma.permissions.create({
                data: {
                    featureId: permission.featureId,
                    roleTypeId: permission.roleId,
                    subDepartmentId: permission.subdepartmentId
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            return await this.prisma.permissions.findMany({
                include: {
                    feature: true,
                    role: true,
                    subDepartment: true
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number) {
        try {
            const res = await this.prisma.permissions.findUnique({
                where: {
                    id
                },
                include: {
                    feature: true,
                    role: true,
                    subDepartment: true
                }
            });
            if (!res) {
                throw new NotFoundException("Permission not found");
            }
            return res;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, permission: UpdatePermissionDto) {
        try {
            return await this.prisma.permissions.update({
                where: {
                    id
                },
                data: {
                    featureId: permission.featureId,
                    roleTypeId: permission.roleId,
                    subDepartmentId: permission.subdepartmentId
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.permissions.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            throw error;
        }
    }
}