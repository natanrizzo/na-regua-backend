import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PoliciesGuard } from "src/casl/policies/policies.guard";
import { ServiceService } from "./service.service";
import { CreateServiceDTO } from "./dto/createService.dto";
import { UpdateServiceDTO } from "./dto/updateService.dto";

@Controller('service')
@UseGuards(PoliciesGuard)
export class ServiceController {
    constructor (
        private readonly serviceService: ServiceService
    ) {}

    @Post('/')
    async createService(
        @Body() createServiceDTO: CreateServiceDTO
    ) {
        return this.serviceService.createService(createServiceDTO);
    }

    @Get('/')
    async getServices() {
        return this.serviceService.getServices();
    }

    @Get('/:id')
    async getService(
        @Param('id') id: string
    ) {
        return this.serviceService.getService(id);
    }

    @Patch('/:id')
    async updateService(
        @Param('id') id: string,
        @Body() updateServiceDTO: UpdateServiceDTO,
    ) {
        return this.serviceService.updateService(id, updateServiceDTO);
    }

    @Delete('/:id')
    async deleteService(
        @Param('id') id: string
    ) {
        return this.serviceService.deleteService(id);
    }
}