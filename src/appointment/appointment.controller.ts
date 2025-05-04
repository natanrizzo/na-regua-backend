import { Body, Controller, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PoliciesGuard } from "src/casl/policies/policies.guard";
import { AppointmentService } from "./appointment.service";
import { CheckPolicies } from "src/casl/policies/policies.decorator";
import { UpdateAppointmentPolicy } from "./policies/updateAppointment.policy";
import { UpdateAppointmentDTO } from "./dto/updateAppointment.dto";
import { CreateAppointmentDTO } from "./dto/createAppointment.dto";

@Controller('appointments')
@UseGuards(PoliciesGuard)
export class AppointmentController {
    constructor(
        private readonly appointmentsService: AppointmentService
    ) {}

    @Post(':id')
    async createAppointment(
        @Body() createAppointmentDTO: CreateAppointmentDTO
    ) {
        return await this.appointmentsService.createAppointment(createAppointmentDTO);
    }

    @Patch(':id')
    @CheckPolicies(new UpdateAppointmentPolicy())
    async updateAppointment(
        @Param('id') id: string,
        @Body() updateAppointmentDTO: UpdateAppointmentDTO
    ) {
        return await this.appointmentsService.updateAppointment(id, updateAppointmentDTO);
    }
}