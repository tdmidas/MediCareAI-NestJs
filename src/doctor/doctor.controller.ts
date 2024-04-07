// doctor.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ParseUUIDPipe } from '@nestjs/common';
import { DoctorDto } from './dto/doctor.dto';
import { DoctorService } from './doctor.service';
import { ValidateDoctorPipe } from './validate-doctor/validate-doctor.pipe';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
import { UseInterceptors } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/user/user.guard';

@UseGuards(UserGuard)
@UseInterceptors(LoggingInterceptor)
@Controller('api/doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Get()
  async findAll(): Promise<DoctorDto[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<DoctorDto> {
    return this.doctorService.findOne(id);
  }

  @Post()
  async create(@Body() doctorDto: DoctorDto): Promise<DoctorDto> {
    return this.doctorService.create(doctorDto);
  }

  @Put(':id')
  @UsePipes(new ValidateDoctorPipe()) //*Use custom pipe
  async update(@Param('id') id: string, @Body() doctorDto: DoctorDto): Promise<DoctorDto> {
    return this.doctorService.update(id, doctorDto);
  }

  @Delete(':id')   //*Use binding pipes
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.doctorService.remove(id);
  }
}
