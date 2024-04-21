import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ParseUUIDPipe } from '@nestjs/common';
import { DoctorDto } from './dto/doctor.dto';
import { DoctorService } from './doctor.service';
import { ValidateDoctorPipe } from './validate-doctor/validate-doctor.pipe';
import { UseGuards } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { AuthenticationGuard } from 'src/auth/authentication.guard';
import { AuthorizationGuard } from 'src/auth/authorization.guard';

@UseGuards(AuthenticationGuard)
@Controller('api/doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Public()
  @Get()
  async findAll(): Promise<DoctorDto[]> {
    return this.doctorService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DoctorDto> {
    return this.doctorService.findOne(id);
  }

  @UseGuards(AuthorizationGuard)
  @Post()
  async create(@Body() doctorDto: DoctorDto): Promise<DoctorDto> {
    return this.doctorService.create(doctorDto);
  }

  @UseGuards(AuthorizationGuard)
  @Put(':id')
  @UsePipes(new ValidateDoctorPipe()) //*Use custom pipe
  async update(@Param('id') id: string, @Body() doctorDto: DoctorDto): Promise<DoctorDto> {
    return this.doctorService.update(id, doctorDto);
  }

  @UseGuards(AuthorizationGuard)
  @Delete(':id')   //*Use binding pipes
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.doctorService.remove(id);
  }
}
