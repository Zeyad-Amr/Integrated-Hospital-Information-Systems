import Joi from "joi";
import Services from "../shared/service";

export default class StaffService extends Services {

    postSchema = Joi.object({
        name: Joi.string(),
    });
    updateSchema = Joi.object({
        name: Joi.string(),
    });
}