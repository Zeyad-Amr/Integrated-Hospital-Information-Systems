import Joi from "joi";

export default class Services {

    constructor() { }

    handleError = (error: any, problem: string = "") => {
        let statusCode: number;
        let msg: string | object;
        //Not Found Error
        if (error?.statusCode) {
            statusCode = error.statusCode
            msg = error.msg
            return { statusCode, msg }
        }
        if (error?.code == "P2025") {
            statusCode = 404
            msg = `Not Found!`
            return { statusCode, msg }
        }
        // Error for connect value to existing one-one or one-many realation
        if (error?.code == "P2014") {
            statusCode = 400
            msg = `You already have a ${error.meta.model_a_name}`
            return { statusCode, msg }
        }
        // Error for adding existig unique values
        if (error?.code == "P2002") {
            statusCode = 400
            msg = `There is ${problem} with this ${error.meta.target[0]}`
            return { statusCode, msg }
        }
        // TODO: handle errors with 500 status code
        statusCode = 500
        msg = error?.message ? error?.message : error
        console.log(error);

        return { statusCode, msg }
    }


    updateSchema = Joi.object({});
    postSchema = Joi.object({});

    validate = (data: any, Schema: Joi.ObjectSchema) => {
        const result = Schema.validate(data);
        if (result.error) {

            throw {
                statusCode: 400,
                msg: result.error.details[0].message

            }
        }
        return result.value
    };
}