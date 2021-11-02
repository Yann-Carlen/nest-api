import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ProjectModule, PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
