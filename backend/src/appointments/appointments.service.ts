import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Between } from 'typeorm'
import { Appointment } from './entities/appointment.entity'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentsRepository.create(createAppointmentDto)
    return this.appointmentsRepository.save(appointment)
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      relations: ['client'],
    })
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id },
      relations: ['client'],
    })
    
    if (!appointment) {
      throw new NotFoundException(`Запис на прийом з ID ${id} не знайдено`)
    }
    
    return appointment
  }

  async findByClientId(clientId: string): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: { clientId },
      relations: ['client'],
    })
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
      relations: ['client'],
      order: {
        date: 'ASC',
        startTime: 'ASC',
      },
    })
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id)
    Object.assign(appointment, updateAppointmentDto)
    return this.appointmentsRepository.save(appointment)
  }

  async remove(id: string): Promise<void> {
    const appointment = await this.findOne(id)
    await this.appointmentsRepository.remove(appointment)
  }
} 