import { Injectable } from "@nestjs/common";
import { Transfer } from "@prisma/client";
import { PrismaGenericRepo } from "src/shared/services/prisma-client/prisma-generic.repo";
import { PrismaService } from "src/shared/services/prisma-client/prisma.service";
import { CreateTransferDto } from "./dto/create-transfer.dto";

@Injectable()
export class TransferRepo extends PrismaGenericRepo<Transfer> {
    constructor(private prismaService: PrismaService) {
        super('transfer', prismaService)
    }

    async createTransfer(data: CreateTransferDto, creatorId: string): Promise<Transfer> {
        try {
            if (data.createdAt == undefined || data.createdAt == null) {
                data.createdAt = new Date();
            }

            if (data.visitStatus == undefined || data.visitStatus == null) {
                data.visitStatus = 'TRANSFERED';
            }

            // update visit status
            const tx = await this.prismaService.$transaction(async (tx) => {
                await tx.visit.update({
                    where: {
                        code: data.visitCode
                    },
                    data: {
                        status: data.visitStatus
                    }
                });

                return await tx.transfer.create({
                    data: {
                        toSubDepId: data.toSubDepId,
                        visitCode: data.visitCode,
                        createdById: creatorId,
                    }
                })
            });

            return tx;
        } catch (error) {
            throw error;
        }
    }
}