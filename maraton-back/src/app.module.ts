import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './ciudad/entities/ciudad.entity';
import { Atleta } from './atleta/entities/atleta.entity';
import { CiudadModule } from './ciudad/ciudad.module';
import { AtletaModule } from './atleta/atleta.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root', 
      password: '42785122', 
      database: 'maraton', 
      entities: [Ciudad, Atleta],
      synchronize: true,
    }),
    CiudadModule,
    AtletaModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
