import { Project } from "src/project/project.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('longtext')
    path: string;

    @ManyToOne(() => Project, project => project.photos)
    project: Project;

}