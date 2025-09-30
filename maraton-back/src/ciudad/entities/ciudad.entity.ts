import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Atleta } from '../../atleta/entities/atleta.entity';

@Entity('ciudades')
export class Ciudad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @OneToMany(() => Atleta, (atleta) => atleta.ciudad)
  atletas: Atleta[];
}