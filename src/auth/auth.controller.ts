import { Controller, Post, Body, UnauthorizedException, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { Public } from '../decorators/public.decorator';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @Public()
    async login(@Body() userDto: UserDto): Promise<{ accessToken: string, userId: string }> {
        const user = await this.authService.login(userDto.email, userDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = this.generateToken(user);
        return { accessToken, userId: user.userId };
    }


    @Post('signup')
    @Public()
    async signup(@Body() userDto: UserDto): Promise<UserDto> {
        return this.authService.signup(userDto);
    }

    private generateToken(user: UserDto): string {
        const payload = {
            userId: user.userId,
            email: user.email,
            isAdmin: user.isAdmin,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
        return token;
    }
}
