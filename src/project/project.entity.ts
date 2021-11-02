import { Photo } from "src/photo/photo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('longtext')
    description: string;

    @OneToMany(() => Photo, photo => photo.project, { eager: true, cascade: true })
    photos: Photo[];

}