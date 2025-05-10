import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PoliciesGuard } from "src/casl/policies/policies.guard";
import { ServiceService } from "./service.service";
import { CreateServiceDTO } from "./dto/createService.dto";
import { UpdateServiceDTO } from "./dto/updateService.dto";
import { CheckPolicies } from "src/casl/policies/policies.decorator";
import { CreateServicePolicy } from "./policies/createService.policy";
import { UpdateServicePolicy } from "./policies/updateService.policy";
import { DeleteServicePolicy } from "./policies/deleteService.policy";
import { Public } from "src/auth/public.decorator";

@Controller('services')
@UseGuards(PoliciesGuard)
export class ServiceController {
    constructor (
        private readonly serviceService: ServiceService
    ) {}

    @Post('/')
    @CheckPolicies(new CreateServicePolicy())
    async createService(
        @Body() createServiceDTO: CreateServiceDTO
    ) {
        return this.serviceService.createService(createServiceDTO);
    }

    @Public()
    @Get('/')
    async getServices() {
        return this.serviceService.getServices();
    }

    @Public()
    @Get('/:id')
    async getService(
        @Param('id') id: string
    ) {
        return this.serviceService.getService(id);
    }

    @Patch('/:id')
    @CheckPolicies(new UpdateServicePolicy())
    async updateService(
        @Param('id') id: string,
        @Body() updateServiceDTO: UpdateServiceDTO,
    ) {
        return this.serviceService.updateService(id, updateServiceDTO);
    }

    @Delete('/:id')
    @CheckPolicies(new DeleteServicePolicy())
    async deleteService(
        @Param('id') id: string
    ) {
        return this.serviceService.deleteService(id);
    }
}