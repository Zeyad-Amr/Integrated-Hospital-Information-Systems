const PrismaClient = require("@prisma/client")
const bcrypt = require("bcrypt")
const prisma = new PrismaClient.PrismaClient()

async function insert() {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash("Admin1234", salt);
    prisma.user.create({
        data: {
            password: password,
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
            console.log("Init data created")
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        }).finally(() => {
            prisma.$disconnect()
        });
}

insert()
