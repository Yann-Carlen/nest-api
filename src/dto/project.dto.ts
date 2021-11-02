import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, Length, ValidateNested } from "class-validator";
import { PhotoDto } from "./photo.dto";

export class ProjectDto {

    @IsNotEmpty()
    @Length(1, 255)
    name: string;

    @IsNotEmpty()
    @Length(1, 1024)
    description: string;

    @ValidateNested({ each: true })
    @IsArray()
    @ArrayNotEmpty()
    @Type(() => PhotoDto)
    photos: PhotoDto[];

}