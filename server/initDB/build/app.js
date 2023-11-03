"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
prisma.user.create({
    data: {
        password: "admin",
        username: "Admin123",
        employee: {
            create: {
                role: "ADMIN",
                person: {
                    create: {
                        "firstName": "Ahmed",
                        "secondName": "Mohamed",
                        "thirdName": "AbdELRaouf",
                        "fourthName": "Mohamed",
                        "SSN": "30002103105556",
                        "verificationMethod": "NATIONALIDCARD",
                        "gender": "MALE",
                        "birthDate": "2001-07-12T00:00:00.000Z",
                        "phone": "+201067662458",
                        "email": "ahmed82@gmail.com",
                        "governate": "Giza",
                        "address": "Fasil"
                    }
                }
            }
        }
    }
})
    .then((res) => {
    console.log("Init data created");
    server.close();
})
    .catch((err) => {
    console.log(err);
    server.close();
});
const PORT = 8080;
let server = app.listen(PORT, () => {
    console.log(`init data server listening to ${PORT}`);
});
//# sourceMappingURL=app.js.map