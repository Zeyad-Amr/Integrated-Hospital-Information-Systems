const PrismaClient = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient.PrismaClient();

async function insertAdmin() {
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash('Admin1234', salt);
  prisma.user
    .create({
      data: {
        password: password,
        username: 'Admin123',
        employee: {
          create: {
            role: 'ADMIN',
            person: {
              create: {
                firstName: 'Ahmed',
                secondName: 'Mohamed',
                thirdName: 'AbdELRaouf',
                fourthName: 'Mohamed',
                SSN: '30002103105556',
                verificationMethod: 'NATIONALIDCARD',
                gender: 'MALE',
                birthDate: '2001-07-12T00:00:00.000Z',
                phone: '+201067662458',
                governate: 'Giza',
                address: 'Fasil',
              },
            },
            shift: 'LONG',
            department: {
              connectOrCreate: {
                where: {
                  name: 'Administration',
                },
                create: {
                  name: 'Administration',
                },
              },
            },
          },
        },
      },
    })
    .then((res) => {
      console.log('Init data created');
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      prisma.$disconnect();
    });
}

async function insertDepartments() {
  prisma.department
    .createMany({
      data: [
        { name: 'Administration' },
        { name: 'Reception' },
        { name: 'Triage A' },
        { name: 'Triage B' },
        { name: 'Polytrauma' },
        { name: 'Short Stay A' },
        { name: 'Short Stay B' },
        { name: 'Minor surgery' },
      ],
    })
    .then((res) => {
      console.log('Init data created');
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      prisma.$disconnect();
    });
}

insertDepartments();
insertAdmin();
