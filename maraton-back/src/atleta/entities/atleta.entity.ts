import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ciudad } from '../../ciudad/entities/ciudad.entity';

@Entity('atletas')
export class Atleta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  dni: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  tiempo: string;

  @Column({ type: 'int' })
  posicion: number;

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.atletas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ciudadId' })
  ciudad: Ciudad;
}