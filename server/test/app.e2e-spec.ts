import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { plainToClass } from 'class-transformer';
import { CreateEmployeeDto } from '../src/employee/dto/create-employee.dto';
import { validate } from 'class-validator';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  describe('POST /employee', () => {
    it('should add employee successfully', () => {
      return request(server)
        .post('/employee')
        .send({
          username: 'diaa23',
          password: 'diaa23',
          name: 'diaa',
          ssn: '123456789',
          email: 'ahmed@gmail.com',
          phone: '01098157522',
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .then(async (response) => {
          expect(response.body).toEqual({
            id: expect.any(String),
            name: 'diaa',
            ssn: '123456789',
            email: 'ahmed@gmail.com',
            phone: '01098157522',
            role: null,
          });
        });
    });

    it('should get conflict because member already exists', async () => {
      return request(server)
        .post('/employee')
        .send({
          username: 'diaa23',
          password: 'diaa23',
          name: 'diaa',
          ssn: '123456789',
          email: 'ahmed@gmail.com',
          phone: '01098157522',
        })
        .expect(409);
    });

    it('checking that validator works with invalid data', async () => {
      const invalidEmployeeData = {
        name: 'diaa',
        ssn: '123456789',
        email: 'ahmed@gmail.com',
      };
      const createEmployeeDto = plainToClass(
        CreateEmployeeDto,
        invalidEmployeeData,
      );
      const errors = await validate(createEmployeeDto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('GET /employee/:id', () => {
    let testID;
    it('/employee (GET)', () => {
      return request(server)
        .get('/employee')
        .expect(200)
        .then((response) => {
          testID = response.body[0].id;
        });
    });

    it('/employee/:id testing with valid ID', () => {
      return request(server).get(`/employee/${testID}`).expect(200);
    });

    it('/employee/:id testing with valid ID', () => {
      return request(server).get(`/employee/wrong-id`).expect(404);
    });
  });

  describe('PATCH /employee/:id', () => {
    it('should update successfully', async () => {
      let testID;
      await request(server)
        .get('/employee')
        .then((response) => {
          testID = response.body[0].id;
        });

      return request(server)
        .patch(`/employee/${testID}`)
        .send({ email: 'diaa@gmail.com' })
        .expect(200);
    });

    it('should get not found id', () => {
      return request(server)
        .patch(`/employee/wrong-id`)
        .send({ email: 'diaa@gmail.com' })
        .expect(404);
    });
  });

  describe('DELETE /employee/:id', () => {
    it('should delete successfully', async () => {
      let testID;
      await request(server)
        .get('/employee')
        .then((response) => {
          testID = response.body[0].id;
        });

      return request(server).delete(`/employee/${testID}`).expect(200);
    });

    it('should get not found id', () => {
      return request(server).delete(`/employee/wrong-id`).expect(404);
    });
  });

  afterAll(async () => {
    await request(server)
      .get('/employee')
      .expect(200)
      .then(async (response) => {
        for (const member of response.body) {
          await request(server).delete(`/employee/${member.id}`).expect(200);
        }
      });
    await app.close();
  });
});
