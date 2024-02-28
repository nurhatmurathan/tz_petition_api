import { ApiProperty } from "@nestjs/swagger";

export class PetitionCreateDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;
}
