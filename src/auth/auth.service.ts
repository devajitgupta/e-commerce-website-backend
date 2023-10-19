import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UsersDocument, Users } from 'src/common/schemas/users.schema';
import { compare, genSalt, hash } from 'bcrypt';
import { CreateTokensDto } from 'src/common/dtos/auth.dto/create-token.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async ValidateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneWithPassword(username);
    if (user && (await this.comaprePassword(password, user.password))) {
      user.password = '';
      return user;
    }
    return null;
  }
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async comaprePassword(
    providedPass: string,
    storedPass: string,
  ): Promise<boolean> {
    const passwordIsMatched = await compare(providedPass, storedPass);
    return passwordIsMatched;
  }
  async createTokens(user): Promise<CreateTokensDto> {
    const payload = {
      user: user.username,
      sub: user._id,
    };

    const accessToken = await this.jwtService.sign(payload);
    const cookieToken = await this.jwtService.sign(payload);
    return { accessToken, cookieToken };
  }
}
