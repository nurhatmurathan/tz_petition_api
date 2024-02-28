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
        return await this.petitionService.create(petitionData.name, petitionData.description);
    }

    @HttpCode(HttpStatus.OK)
    @ApiDefaultResponse({ type: PetitionDto, isArray: true })
    @Get("list")
    async list() {
        return await this.petitionService.list();
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
}
