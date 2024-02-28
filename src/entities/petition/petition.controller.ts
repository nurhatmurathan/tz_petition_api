import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseBoolPipe,
    ParseIntPipe,
    Post,
    Query,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiDefaultResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
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
    async create(@Body() petitionData: PetitionCreateDto, @Request() request) {
        const instance = await this.petitionService.create(petitionData.name, petitionData.description);

        return this.mapToPetitionDto(instance, request.user.sub);
    }

    @HttpCode(HttpStatus.OK)
    @ApiDefaultResponse({ type: PetitionDto, isArray: true })
    @ApiQuery({ name: "search-by-name", required: false })
    @ApiQuery({ name: "orderBy", enum: ["ASC", "DESC"] })
    @ApiQuery({ name: "voted", enum: ["false", "true"] })
    @Get("list")
    async list(
        @Query("search-by-name") name?: string,
        @Query("orderBy") orderBy: "ASC" | "DESC" = "ASC",
        @Query("voted", ParseBoolPipe) voted?: boolean,
        @Request() request?
    ) {
        const userId: number = request.user.sub;
        const instances = await this.petitionService.list(userId, name, voted, orderBy);

        return instances.map((instance) => this.mapToPetitionDto(instance, userId));
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

    private mapToPetitionDto(instance: Petition, userId: number) {
        const { id, name, description, createdDate } = instance;
        const numberOfVotes: number = instance.votes?.length || 0;
        const voted: boolean = instance.votes?.some((vote) => vote.user.id === userId) || false;

        return { id, name, description, createdDate, numberOfVotes, voted };
    }
}
