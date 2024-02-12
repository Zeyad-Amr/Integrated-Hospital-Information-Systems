import { Injectable } from "@nestjs/common";

@Injectable()
export class PermissionsMiddleware {
    use(req: Request, res: Response, next: Function, permission: number) {
        console.log('Request...');
        next();
    }
}