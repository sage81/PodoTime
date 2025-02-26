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
      return await this.clientsRepository.find();
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
      if (!clientData.firstName || !clientData.lastName || !clientData.phone) {
        throw new Error('Missing required fields');
      }

      const client = this.clientsRepository.create({
        ...clientData,
        category: clientData.category || 'regular'
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