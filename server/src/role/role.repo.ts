import { Injectable } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/shared/decorators/public.decorator";
import { PrismaService } from "src/shared/services/prisma-client/prisma.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Public()
@ApiTags('Role')
@Injectable()
export class RoleRepo {
    constructor(private prisma: PrismaService) { }
    async create(role: CreateRoleDto) {
        try {
            return await this.prisma.roleType.create({
                data: {
                    value: role.value,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            return await this.prisma.roleType.findMany();
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number) {
        try {
            return await this.prisma.roleType.findUnique({
                where: {
                    id
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, role: UpdateRoleDto) {
        try {
            return await this.prisma.roleType.update({
                where: {
                    id
                },
                data: {
                    value: role.value
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.roleType.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            throw error;
        }
    }
}