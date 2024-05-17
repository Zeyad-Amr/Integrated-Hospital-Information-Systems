const PrismaClient = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient.PrismaClient();
const {
  departmentsData,
  genderData,
  identityTypes,
  roleTypes,
  shiftTypes,
  cameFromOptionsType,
  LOCs,
  comorbidities,
  triageTypes,
  attendantRoles,
  KinshipTypes,
  governate
} = require('./data')

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
            role: { connect: { value: 'مدير' } },
            person: {
              create: {
                firstName: 'Ahmed',
                secondName: 'Mohamed',
                thirdName: 'AbdELRaouf',
                fourthName: 'Mohamed',
                fullName: 'Ahmed Mohamed AbdELRaouf Mohamed',
                SSN: '30002103105556',
                verificationMethod: { connect: { value: 'بطاقة الهوية الوطنية' } },
                gender: { connect: { value: "ذكر" } },
                birthDate: '2001-07-12T00:00:00.000Z',
                governate: { connect: { id: 1 } },
                address: 'Fasil',
                type: PrismaClient.PersonType.EMPLOYEE
              },
            },
            shift: { connect: { value: 'يوم كامل' } }
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
      data: departmentsData,
      skipDuplicates: true
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

async function insertEnums() {
  prisma.identityType.createMany({
    data: identityTypes,
    skipDuplicates: true
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
  prisma.genderType.createMany({
    data: genderData,
    skipDuplicates: true
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
  prisma.roleType.createMany({
    data: roleTypes,
    skipDuplicates: true
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
  prisma.shiftType.createMany({
    data: shiftTypes,
    skipDuplicates: true
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
  prisma.cameFromOptions.createMany({
    data: cameFromOptionsType,
    skipDuplicates: true
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
  prisma.attendantRole.createMany({
    data: attendantRoles,
    skipDuplicates: true
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
  prisma.triageType.createMany({
    data: triageTypes,
    skipDuplicates: true
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
  prisma.lOC.createMany({
    data: LOCs,
    skipDuplicates: true
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
  prisma.comorbidity.createMany({
    data: comorbidities,
    skipDuplicates: true
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
  prisma.kinshipType.createMany({
    data: KinshipTypes,
    skipDuplicates: true
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
  prisma.governate.createMany({
    data: governate,
    skipDuplicates: true
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
insertEnums();
