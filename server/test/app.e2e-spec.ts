import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { plainToClass } from 'class-transformer';
import { CreateStaffDto } from '../src/staff/dto/create-staff.dto';
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

  describe('POST /staff', () => {
    it('should add staff successfully', () => {
      return request(server)
        .post('/staff')
        .send({
          username:'diaa23',
          password:'diaa23',
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
        .post('/staff')
        .send({
          username:'diaa23',
          password:'diaa23',
          name: 'diaa',
          ssn: '123456789',
          email: 'ahmed@gmail.com',
          phone: '01098157522',
        })
        .expect(409);
    });

    it('checking that validator works with invalid data', async () => {
      const invalidStaffData = {
        name: 'diaa',
        ssn: '123456789',
        email: 'ahmed@gmail.com',
      };
      const createStaffDto = plainToClass(CreateStaffDto, invalidStaffData);
      const errors = await validate(createStaffDto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('GET /staff/:id', () => {
    let testID;
    it('/staff (GET)', () => {
      return request(server)
        .get('/staff')
        .expect(200)
        .then((response) => {
          testID = response.body[0].id;
        });
    });

    it('/staff/:id testing with valid ID', () => {
      return request(server).get(`/staff/${testID}`).expect(200);
    });

    it('/staff/:id testing with valid ID', () => {
      return request(server).get(`/staff/wrong-id`).expect(404);
    });
  });

  describe('PATCH /staff/:id', () => {
    it('should update successfully', async () => {
      let testID;
      await request(server)
        .get('/staff')
        .then((response) => {
          testID = response.body[0].id;
        });

      return request(server)
        .patch(`/staff/${testID}`)
        .send({ email: 'diaa@gmail.com' })
        .expect(200);
    });

    it('should get not found id', () => {
      return request(server)
        .patch(`/staff/wrong-id`)
        .send({ email: 'diaa@gmail.com' })
        .expect(404);
    });
  });

  describe('DELETE /staff/:id', () => {
    it('should delete successfully', async () => {
      let testID;
      await request(server)
        .get('/staff')
        .then((response) => {
          testID = response.body[0].id;
        });

      return request(server).delete(`/staff/${testID}`).expect(200);
    });

    it('should get not found id', () => {
      return request(server).delete(`/staff/wrong-id`).expect(404);
    });
  });

  afterAll(async () => {
    await request(server)
      .get('/staff')
      .expect(200)
      .then(async (response) => {
        for (const member of response.body) {
          await request(server).delete(`/staff/${member.id}`).expect(200);
        }
      });
    await app.close();
  });
});
