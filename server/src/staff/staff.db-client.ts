import db, { DbClient } from "../shared/db";
import { Staff, StaffMethodsArgs, StaffResponse } from "./staff.interface";

export default class StaffDB {
    private prisma: DbClient
    constructor() {
        this.prisma = db;
    }

    async create(data: Staff, ids?: string | string[] | undefined): Promise<StaffResponse> {
        try {
            const newMember = await this.prisma.staff.create({ data })
            return newMember
        } catch (error: any) {
            throw error
        }
    }
    async getAll(args?: StaffMethodsArgs['FindManyArgs'] | undefined): Promise<StaffResponse[]> {
        try {
            const staff = await this.prisma.staff.findMany(args)
            return staff
        } catch (error: any) {
            throw error
        }
    }
    async getOne(args: StaffMethodsArgs['FindFirstOrThrowArgs']): Promise<StaffResponse | null> {
        try {
            const staffMember = await this.prisma.staff.findFirstOrThrow(args)
            return staffMember
        } catch (error: any) {
            throw error
        }
    }
    async updateOne(args: StaffMethodsArgs['UpdateArgs']): Promise<StaffResponse> {
        try {
            const staff = await this.prisma.staff.update(args)
            return staff
        } catch (error: any) {
            throw error
        }
    }
    async deleteOne(args: StaffMethodsArgs['DeleteArgs']) {
        try {
            const staff = await this.prisma.staff.delete(args)
            return staff
        } catch (error: any) {
            throw error
        }
    }
    async count(args: StaffMethodsArgs['CountArgs']): Promise<number> {
        try {
            const staff = await this.prisma.staff.count(args)
            return staff
        } catch (error: any) {
            throw error
        }
    }
}