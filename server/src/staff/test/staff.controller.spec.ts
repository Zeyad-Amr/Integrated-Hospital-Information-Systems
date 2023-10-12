import { Test, TestingModule } from '@nestjs/testing';
import { StaffController } from '../staff.controller';
import { StaffService } from '../staff.service';
import { CreateStaffDto } from '../dto/create-staff.dto';

describe('StaffController', () => {
  let controller: StaffController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffController],
      providers: [StaffService],
    }).compile();
    controller = module.get<StaffController>(StaffController);
  });

  it('controller should be defined', async () => {
    expect(controller).toBeDefined();
  });
  it('fdsaf', async () => {
    const createStaffDto: CreateStaffDto = {
      name: 'diaa',
      ssn: '123456789',
      email: 'ahmed@gmail.com',
      phone: '01098157522',
      role: 'receptionist',
    };
    const want = {
      id: expect.any(String),
      name: 'diaa',
      ssn: '123456789',
      email: 'ahmed@gmail.com',
      phone: '01098157522',
      role: 'receptionist',
    };
    const got = await controller.create(createStaffDto);
    expect(got).toEqual(want);
  });
});
