import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma-client/prisma.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";

@Injectable()
export class RoomRepo {
    constructor(private prisma: PrismaService) { }
    async create(room: CreateRoomDto) {
        try {
            return await this.prisma.room.create({
                data: {
                    name: room.name,
                    location: room.location
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            return await this.prisma.room.findMany({
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
            const res = await this.prisma.room.findUnique({
                where: {
                    id
                },
                include: {
                    SubDepartment: true
                }
            });
            if (!res) {
                throw new NotFoundException("Room not found");
            }
            return res;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, room: UpdateRoomDto) {
        try {
            return await this.prisma.room.update({
                where: {
                    id
                },
                data: {
                    name: room.name,
                    location: room.location
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.room.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            throw error;
        }
    }
}