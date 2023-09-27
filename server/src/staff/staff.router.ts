import express from "express";
import { StaffController } from "./staff.controller";
import StaffDB from "./staff.data-access";

const router = express.Router();

const db = new StaffDB()
const controller = new StaffController(db)

router.post('/staff', controller.post_member)
router.get('/staff', controller.get_all_members)
router.get('/staff/:id', controller.get_member)
router.patch('/staff/:id', controller.update_member)
router.delete('/staff/:id', controller.delete_member)

export default router