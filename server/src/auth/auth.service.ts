import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthRepo } from './auth.repo';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private authRepo: AuthRepo,
    private jwtService: JwtService,
  ) { }

  async login(loginUserDto: LoginUserDto) {
    try {
      const errInvalidCredentials = 'Invalid username or password';
      const user = await this.authRepo.getByUsername(loginUserDto.username);
      if (!user) {
        throw new UnauthorizedException(errInvalidCredentials);
      }
      console.log(user);

      const validPass = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      console.log(validPass);
      if (!validPass) {
        throw new UnauthorizedException(errInvalidCredentials);
      }
      const token = await this.jwtService.signAsync({
        sub: user.employeeId,
        username: user.username,
        role: user.employee.role,
      });
      return token;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(
    username: string,
    newPassword: LoginUserDto['password'],
    oldPassword: string,
  ) {
    try {
      const user = await this.authRepo.getByUsername(username);
      if (!user) throw new NotFoundException('Wrong username');

      const validPass = await bcrypt.compare(oldPassword, user.password);
      if (!validPass) throw new UnauthorizedException('Wrong password');

      newPassword = await this.hashPassword(newPassword);
      await this.authRepo.update(username, { password: newPassword });
    } catch (error) {
      throw error;
    }
  }

  generateUsername = async (name: string) => {
    name = name.toLowerCase();
    let usernames: User[];
    try {
      const { items } = await this.authRepo.getAll({ select: { username: true } });
      usernames = items
    } catch (error) {
      throw error;
    }
    let exist = usernames.find(({ username }) => username === name);

    while (exist) {
      name = name + Math.round(Math.random() * 100);
      exist = usernames.find(({ username }) => username === name);
    }
    return name;
  };

  generatePassword = (length: number) => {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomValues = new Uint8Array(length);

    crypto.getRandomValues(randomValues);

    return Array.from(
      randomValues,
      (value) => charset[value % charset.length],
    ).join('');
  };

  async findAll() {
    return await this.authRepo.getAll();
    return null
  }

  hashPassword = async (password: string) => {
    //hash password using bcrypt package
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
  };
}
