import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {

    constructor(
        @InjectRepository(Photo)
        private photosRepository: Repository<Photo>
    ) { }

    async remove(id: number) {
        try {
            await this.photosRepository.delete(id);
        } catch {
            throw new BadRequestException('Cannot delete this photo');
        }
    }

}
