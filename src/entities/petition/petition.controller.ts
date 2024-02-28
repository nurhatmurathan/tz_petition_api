import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiDefaultResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "./../../auth/guards/auth.guard";
import { PetitionCreateDto } from "./dto/petition.create.dto";
import { PetitionDto } from "./dto/petition.dto";
import { Petition } from "./petition.entity";
import { PetitionService } from "./petition.service";

@ApiTags("Petition")
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller("petition")
export class PetitionController {
    constructor(private petitionService: PetitionService) {}

    @HttpCode(HttpStatus.CREATED)
    @ApiDefaultResponse({ type: PetitionDto })
    @Post("create")
    async create(@Body() petitionData: PetitionCreateDto) {
        const instance = await this.petitionService.create(petitionData.name, petitionData.description);

        return this.mapToPetitionDto(instance);
    }

    @HttpCode(HttpStatus.OK)
    @ApiDefaultResponse({ type: PetitionDto, isArray: true })
    @Get("list")
    async list() {
        const instances = await this.petitionService.list();

        return instances.map((instance) => this.mapToPetitionDto(instance));
    }

    @Post("vote/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    async vote(@Param("id", ParseIntPipe) id: number, @Request() request): Promise<any> {
        return this.petitionService.addVote(request.user.sub, id);
    }

    @Post("cancel-vote/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    async cancelVote(@Param("id", ParseIntPipe) id: number, @Request() request): Promise<any> {
        return this.petitionService.cancelVote(request.user.sub, id);
    }

    private mapToPetitionDto(instance: Petition) {
        const { id, name, description, createdDate } = instance;
        const numberOfVotes = instance.votes?.length || 0;

        return { id, name, description, createdDate, numberOfVotes };
    }
}
