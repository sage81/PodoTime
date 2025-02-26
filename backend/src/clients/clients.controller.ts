import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, Headers } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async findAll(): Promise<Client[]> {
    const clients = await this.clientsService.findAll();
    return clients.map(client => ({
      ...client,
      firstName: this.decodeText(client.firstName),
      lastName: this.decodeText(client.lastName),
      notes: client.notes ? this.decodeText(client.notes) : undefined
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    const client = await this.clientsService.findOne(id);
    if (!client) {
      throw new HttpException('Клієнта не знайдено', HttpStatus.NOT_FOUND);
    }
    return {
      ...client,
      firstName: this.decodeText(client.firstName),
      lastName: this.decodeText(client.lastName),
      notes: client.notes ? this.decodeText(client.notes) : undefined
    };
  }

  @Post()
  async create(@Body() clientData: Partial<Client>): Promise<Client> {
    const client = await this.clientsService.create({
      ...clientData,
      firstName: clientData.firstName,
      lastName: clientData.lastName,
      notes: clientData.notes
    });

    return {
      ...client,
      firstName: this.decodeText(client.firstName),
      lastName: this.decodeText(client.lastName),
      notes: client.notes ? this.decodeText(client.notes) : undefined
    };
  }

  private decodeText(text: string): string {
    try {
      if (text.includes('%')) {
        return decodeURIComponent(text);
      }
      return text;
    } catch {
      return text;
    }
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
    return {
      ...client,
      firstName: this.decodeText(client.firstName),
      lastName: this.decodeText(client.lastName),
      notes: client.notes ? this.decodeText(client.notes) : undefined
    };
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