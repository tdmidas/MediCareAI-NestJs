import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
import { AuthenticationGuard } from 'src/auth/authentication.guard';
import { AuthorizationGuard } from 'src/auth/authorization.guard';

@Controller('api/users')
@UseGuards(AuthenticationGuard)
@UseInterceptors(LoggingInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthorizationGuard)
    @Get()
    async findAll(): Promise<UserDto[]> {
        return this.userService.findAll();
    }
    @UseGuards(AuthorizationGuard)
    @Get(':id')

    async findOne(@Param('id') id: string): Promise<UserDto> {
        return this.userService.findOne(id);
    }
    @UseGuards(AuthorizationGuard)
    @Post()

    async create(@Body() userDto: UserDto): Promise<UserDto> {
        return this.userService.create(userDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() userDto: UserDto): Promise<UserDto> {
        return this.userService.update(id, userDto);
    }

    @Delete(':id')

    async remove(@Param('id') id: string): Promise<void> {
        return this.userService.remove(id);
    }


}
