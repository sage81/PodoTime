import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    const client = await this.clientsService.findOne(id);
    if (!client) {
      throw new HttpException('Клієнта не знайдено', HttpStatus.NOT_FOUND);
    }
    return client;
  }

  @Post()
  create(@Body() clientData: Partial<Client>): Promise<Client> {
    return this.clientsService.create(clientData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() clientData: Partial<Client>,
  ): Promise<Client> {
    const client = await this.clientsService.update(id, clientData);
    if (!client) {
      throw new HttpException('Клієнта не знайдено', HttpStatus.NOT_FOUND);
    }
    return client;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const client = await this.clientsService.findOne(id);
    if (!client) {
      throw new HttpException('Клієнта не знайдено', HttpStatus.NOT_FOUND);
    }
    return this.clientsService.remove(id);
  }
} 