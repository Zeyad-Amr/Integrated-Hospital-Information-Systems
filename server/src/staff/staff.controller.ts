import { Request, Response } from "express";
import { StaffUseCases } from "./staff.use-case";
import StaffDB from "./staff.data-access";

export class StaffController {
    private use_cases: StaffUseCases
    constructor(private db: StaffDB) {
        this.use_cases = new StaffUseCases(db);
    }

    public post_member = async (req: Request, res: Response) => {
        try {
            const member = await this.use_cases.create(req.body)
            return res.status(201).json({ member })
        } catch (err: any) {
            console.log(err);

            return res.status(err?.statusCode ? err.statusCode : 500).json(err)
        }
    }

    public get_all_members = async (req: Request, res: Response) => {
        try {
            const members = await this.use_cases.get_all()
            return res.status(200).json({ members })
        } catch (err: any) {
            return res.status(err?.statusCode ? err.statusCode : 500).json(err)
        }
    }

    public get_member = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const member = await this.use_cases.get_one(+id)
            return res.status(200).json({ member })
        } catch (err: any) {
            return res.status(err?.statusCode ? err.statusCode : 500).json(err)
        }
    }

    public update_member = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const member = await this.use_cases.update(+id, req.body)
            return res.status(200).json({ member })
        } catch (err: any) {
            return res.status(err?.statusCode ? err.statusCode : 500).json(err)
        }
    }

    public delete_member = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            await this.use_cases.delete(+id)
            return res.status(200).json({ msg: "Deleted Successfully" })
        } catch (err: any) {
            return res.status(err?.statusCode ? err.statusCode : 500).json(err)
        }
    }
}