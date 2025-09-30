import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepo: Repository<Ciudad>,
  ) {}

  findAll(): Promise<Ciudad[]> {
    return this.ciudadRepo.find();
  }

  async findOne(id: number): Promise<Ciudad> {
    const ciudad = await this.ciudadRepo.findOne({ where: { id } });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con id ${id} no encontrada`);
    }
    return ciudad;
  }

  create(dto: CreateCiudadDto): Promise<Ciudad> {
    const nuevaCiudad = this.ciudadRepo.create(dto);
    return this.ciudadRepo.save(nuevaCiudad);
  }

  async update(id: number, dto: UpdateCiudadDto): Promise<Ciudad> {
    const ciudad = await this.findOne(id);
    Object.assign(ciudad, dto);
    return this.ciudadRepo.save(ciudad);
  }

  async remove(id: number): Promise<void> {
    const ciudad = await this.findOne(id);
    await this.ciudadRepo.remove(ciudad);
  }
}
