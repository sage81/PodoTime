import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Appointment } from '../../appointments/entities/appointment.entity'

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  phone: string

  @Column({ nullable: true })
  email: string

  @Column({ default: 'regular' })
  category: string

  @Column({ type: 'text', nullable: true })
  notes: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @OneToMany(() => Appointment, appointment => appointment.client)
  appointments: Appointment[]
} 