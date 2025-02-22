import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientsRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Клієнта з ID ${id} не знайдено`);
    }
    return client;
  }

  async create(clientData: Partial<Client>): Promise<Client> {
    const client = this.clientsRepository.create(clientData);
    return this.clientsRepository.save(client);
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