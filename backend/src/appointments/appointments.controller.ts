import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { AppointmentsService } from './appointments.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { Appointment } from './entities/appointment.entity'

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return this.appointmentsService.create(createAppointmentDto)
  }

  @Get()
  findAll(): Promise<Appointment[]> {
    return this.appointmentsService.findAll()
  }

  @Get('client/:clientId')
  findByClientId(@Param('clientId') clientId: string): Promise<Appointment[]> {
    return this.appointmentsService.findByClientId(clientId)
  }

  @Get('date-range')
  findByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<Appointment[]> {
    return this.appointmentsService.findByDateRange(
      new Date(startDate),
      new Date(endDate),
    )
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Appointment> {
    return this.appointmentsService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentsService.update(id, updateAppointmentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.appointmentsService.remove(id)
  }
} 