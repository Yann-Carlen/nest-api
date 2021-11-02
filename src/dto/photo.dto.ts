import { IsNotEmpty, IsUrl, Length } from "class-validator";

export class PhotoDto {

    @IsNotEmpty()
    @IsUrl()
    @Length(1, 512)
    path: string;

}