//src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,  // Use the email parameter here
      }
    });
  
    // Step 2: If no user is found, throw an error
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    // Step 3: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    // Step 4: Generate a JWT token
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
  
    // Step 5: Return the user and the token
    return {
      user: new UserEntity(user),
      accessToken: token,
    };
  }
}