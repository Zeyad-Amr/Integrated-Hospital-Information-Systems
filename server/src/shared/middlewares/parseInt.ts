import { NextFunction, Request, Response } from "express"

export function paramsToInt(param: string, req: Request, res: Response, next: NextFunction): void {
    const numericValue = parseInt(req.params[param])
    if (Number.isNaN(numericValue)) {
        throw {
            statusCode: 400,
            msg: 'Invalid parameter type',
        }
    }

}
