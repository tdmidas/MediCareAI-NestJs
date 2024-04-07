import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UserGuard } from './user.guard';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';

@Controller('api/user')
@UseGuards(UserGuard)
@UseInterceptors(LoggingInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()

    async findAll(): Promise<UserDto[]> {
        return this.userService.findAll();
    }

    @Get(':id')

    async findOne(@Param('id') id: string): Promise<UserDto> {
        return this.userService.findOne(id);
    }

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
