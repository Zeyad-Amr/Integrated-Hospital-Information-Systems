import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma-client/prisma.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { PrismaGenericRepo } from "src/shared/services/prisma-client/prisma-generic.repo";
import { Room } from "@prisma/client";

@Injectable()
export class RoomRepo extends PrismaGenericRepo<Room> {
    constructor(private prismaService: PrismaService) {
        super('room', prismaService);
    }
    async create(room: CreateRoomDto) {
        try {
            return await this.prismaService.room.create({
                data: {
                    name: room.name,
                    location: room.location
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number) {
        try {
            const res = await this.prismaService.room.findUnique({
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

    async updateRoom(id: number, room: UpdateRoomDto) {
        try {
            return await this.prismaService.room.update({
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
            return await this.prismaService.room.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            throw error;
        }
    }
}