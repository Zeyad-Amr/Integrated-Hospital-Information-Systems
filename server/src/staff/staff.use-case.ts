import StaffDB from "./staff.db-client";
import { Staff } from "./staff.interface";
import StaffService from "./staff.service";

export class StaffUseCases {
    private service: StaffService = new StaffService();
    constructor(private db: StaffDB) {
        this.db = db;
    }

    public async create(data: Staff) {
        try {
            data = this.service.validate(data, this.service.postSchema);
            const newMember = await this.db.create(data);
            return newMember
        } catch (error) {
            const err = this.service.handleError(error, "product")
            throw err;
        }
    }

    public async get_one(id: string) {
        try {
            const staffMember = await this.db.getOne({ where: { id } });
            return staffMember
        } catch (error) {
            const err = this.service.handleError(error, "product")
            throw err;
        }
    }

    public async get_all() {
        try {
            const staff = await this.db.getAll();
            return staff
        } catch (error) {
            const err = this.service.handleError(error, "product")
            throw err;
        }
    }

    public async update(id: string, data: Staff) {
        try {
            data = this.service.validate(data, this.service.updateSchema);
            const staff = await this.db.updateOne({
                data,
                where: {
                    id
                }
            });
            return staff
        } catch (error) {
            const err = this.service.handleError(error, "product")
            throw err;
        }
    }

    public async delete(id: string) {
        try {
            const staff = await this.db.deleteOne({
                where: {
                    id
                }
            });
            return staff
        } catch (error) {
            const err = this.service.handleError(error, "product")
            throw err;
        }
    }

}