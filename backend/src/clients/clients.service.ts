import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    try {
      this.logger.log('Fetching all clients');
      const clients = await this.clientsRepository.find();
      // Переконуємося, що всі рядки в UTF-8
      return clients.map(client => ({
        ...client,
        firstName: Buffer.from(client.firstName, 'utf8').toString(),
        lastName: Buffer.from(client.lastName, 'utf8').toString(),
        notes: client.notes ? Buffer.from(client.notes, 'utf8').toString() : null,
      }));
    } catch (error) {
      this.logger.error('Error fetching clients:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientsRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Клієнта з ID ${id} не знайдено`);
    }
    return client;
  }

  async create(clientData: Partial<Client>): Promise<Client> {
    try {
      const client = this.clientsRepository.create({
        ...clientData,
        firstName: Buffer.from(clientData.firstName, 'utf8').toString(),
        lastName: Buffer.from(clientData.lastName, 'utf8').toString(),
        notes: clientData.notes ? Buffer.from(clientData.notes, 'utf8').toString() : null,
      });
      return await this.clientsRepository.save(client);
    } catch (error) {
      this.logger.error('Error creating client:', error);
      throw error;
    }
  }

  async update(id: string, clientData: Partial<Client>): Promise<Client> {
    await this.clientsRepository.update(id, clientData);
    const updatedClient = await this.clientsRepository.findOne({ where: { id } });
    if (!updatedClient) {
      throw new NotFoundException(`Клієнта з ID ${id} не знайдено`);
    }
    return updatedClient;
  }

  async remove(id: string): Promise<void> {
    const result = await this.clientsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Клієнта з ID ${id} не знайдено`);
    }
  }
} 