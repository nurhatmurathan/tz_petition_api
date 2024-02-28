import { ApiProperty } from "@nestjs/swagger";
import { PetitionCreateDto } from "./petition.create.dto";

export class PetitionDto extends PetitionCreateDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    createdDate: string;
}
