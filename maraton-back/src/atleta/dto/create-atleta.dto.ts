import { IsInt, IsNotEmpty, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateAtletaDto {
  @IsInt()
  @IsNotEmpty()
  dni: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tiempo: string;

  @IsInt()
  @IsPositive()
  posicion: number;

  @IsInt()
  @IsNotEmpty()
  ciudadId: number;
}