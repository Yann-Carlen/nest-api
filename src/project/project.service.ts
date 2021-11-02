import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDto } from 'src/dto/project.dto';
import { Photo } from 'src/photo/photo.entity';
import { PhotoService } from 'src/photo/photo.service';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {

    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
        private readonly photoService: PhotoService
    ) { }


    findAll(): Promise<Project[]> {
        return this.projectsRepository.find();
    }

    async findOne(id: number): Promise<Project> {
        const project = await this.projectsRepository.findOne(id);

        if (project === undefined) {
            throw new NotFoundException('Project cannot be found');
        }

        return project;
    }

    async remove(id: number): Promise<void> {
        try {
            await this.projectsRepository.delete(id);
        } catch {
            throw new BadRequestException('Project cannot be deleted');
        }
    }

    async save(projectDto: ProjectDto): Promise<Project> {
        try {
            return await this.projectsRepository.save(projectDto);
        } catch {
            throw new BadRequestException('Project cannot be created');
        }
    }

    async update(id: number, projectDto: ProjectDto): Promise<Project> {
        try {
            const project = await this.projectsRepository.findOne(id);

            project.name = projectDto.name;
            project.description = projectDto.description;

            for (let photo of project.photos) {
                await this.photoService.remove(photo.id);
            }

            project.photos = [];

            for (let photo of projectDto.photos) {
                const p = new Photo();
                p.path = photo.path;

                project.photos.push(p)
            }

            return await this.projectsRepository.save(project);
        } catch (e) {
            console.log(e);
            throw new BadRequestException('Project cannot be updated');
        }
    }

}