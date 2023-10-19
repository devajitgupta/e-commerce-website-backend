import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from 'src/common/dtos/auth.dto/login.dto';
import { error } from 'console';
import { CreateUserDto } from 'src/common/dtos/user.dto';
import { SignUpDto } from 'src/common/dtos/auth.dto/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() cardentials: LoginDto, @Req() Req) {
    let user = await this.authService.ValidateUser(
      cardentials.username,
      cardentials.password,
    );
    if (!user) {
      console.log('Invalid username or password');
    }
  }

  @Post('signup')
  async signUp(@Body() createUserDto: SignUpDto, @Req() Req) {
    const foundUser = await this.userService.getUserByUsername(
      createUserDto.username,
    );
    if (foundUser) {
      return error('account already exists');
    }

    // create user
    let user = await this.userService.createUser(createUserDto);
    if (!user) {
      return error('failed to regiaster new user');
    }

    // create a token
    const { accessToken, cookieToken } =
      await this.authService.createTokens(user);
    return;
  }
}
