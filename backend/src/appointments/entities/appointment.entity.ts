import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Client } from '../../clients/entities/client.entity'

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'clientId' })
  clientId: string

  @ManyToOne(() => Client, client => client.appointments)
  @JoinColumn({ name: 'clientId' })
  client: Client

  @Column({ type: 'date' })
  date: Date

  @Column({ type: 'time' })
  startTime: string

  @Column({ type: 'time' })
  endTime: string

  @Column({ default: 'scheduled' })
  status: string

  @Column()
  serviceType: string

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number

  @Column({ type: 'text', nullable: true })
  notes: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
} 