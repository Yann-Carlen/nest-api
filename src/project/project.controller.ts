import { Body, Controller, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { FindOneDto } from 'src/dto/findone.dto';
import { ProjectDto } from 'src/dto/project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {

    constructor(
        private readonly projectService: ProjectService
    ) { }

    @Get('/:id')
    findOne(@Param() params: FindOneDto) {
        return this.projectService.findOne(params.id);
    }

    @Get()
    findAll() {
        return this.projectService.findAll();
    }

    @Post()
    @HttpCode(201)
    async create(@Body() projectDto: ProjectDto) {
        return this.projectService.save(projectDto)
    }

    @Put('/:id')
    @HttpCode(202)
    async update(@Param() params: FindOneDto, @Body() projectDto: ProjectDto) {
        return this.projectService.update(params.id, projectDto)
    }

    @Get('/:id')
    deleteOne(@Param() params: FindOneDto) {
        return this.projectService.remove(params.id);
    }

}
