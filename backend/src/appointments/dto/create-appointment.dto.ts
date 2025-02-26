import { IsNotEmpty, IsUUID, IsDateString, IsInt, IsEnum, IsOptional } from 'class-validator'
import { AppointmentStatus } from '../entities/appointment.entity'

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsUUID()
  clientId: string

  @IsNotEmpty()
  @IsDateString()
  date: string

  @IsNotEmpty()
  @IsDateString()
  startTime: string

  @IsNotEmpty()
  @IsDateString()
  endTime: string

  @IsNotEmpty()
  @IsInt()
  duration: number

  @IsNotEmpty()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus

  @IsOptional()
  notes?: string

  @IsOptional()
  serviceType: string

  @IsOptional()
  price?: number
} 