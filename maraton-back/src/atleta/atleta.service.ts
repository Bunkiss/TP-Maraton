import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Atleta } from './entities/atleta.entity';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { UpdateAtletaDto } from './dto/update-atleta.dto';
import { Ciudad } from '../ciudad/entities/ciudad.entity';

@Injectable()
export class AtletaService {
  constructor(
    @InjectRepository(Atleta)
    private readonly atletaRepo: Repository<Atleta>,

    @InjectRepository(Ciudad)
    private readonly ciudadRepo: Repository<Ciudad>,
  ) {}

  findAll(): Promise<Atleta[]> {
    return this.atletaRepo.find({ relations: ['ciudad'] });
  }

  async findOne(id: number): Promise<Atleta> {
    const atleta = await this.atletaRepo.findOne({
      where: { id },
      relations: ['ciudad'],
    });
    if (!atleta) {
      throw new NotFoundException(`Atleta con id ${id} no encontrado`);
    }
    return atleta;
  }

  async create(dto: CreateAtletaDto): Promise<Atleta> {
    const existe = await this.atletaRepo.findOne({ where: { dni: dto.dni } });
    if (existe) {
      throw new BadRequestException(`El atleta con DNI ${dto.dni} ya existe`);
    }
    const ciudad = await this.ciudadRepo.findOne({ where: { id: dto.ciudadId } });
    if (!ciudad) {
      throw new BadRequestException(`La ciudad con id ${dto.ciudadId} no existe`);
    }

    const atleta = this.atletaRepo.create({
      ...dto,
      ciudad,
    });
    return this.atletaRepo.save(atleta);
  }

  async update(id: number, dto: UpdateAtletaDto): Promise<Atleta> {
    const atleta = await this.findOne(id);

    if (dto.dni && dto.dni !== atleta.dni) {
      const existe = await this.atletaRepo.findOne({ where: { dni: dto.dni } });
      if (existe) {
        throw new BadRequestException(`El atleta con DNI ${dto.dni} ya existe`);
      }
    }

    if (dto.ciudadId) {
      const ciudad = await this.ciudadRepo.findOne({ where: { id: dto.ciudadId } });
      if (!ciudad) {
        throw new BadRequestException(`La ciudad con id ${dto.ciudadId} no existe`);
      }
      atleta.ciudad = ciudad;
    }

    Object.assign(atleta, dto);
    return this.atletaRepo.save(atleta);
  }

  async remove(id: number): Promise<void> {
    const atleta = await this.findOne(id);
    await this.atletaRepo.remove(atleta);
  }
}

