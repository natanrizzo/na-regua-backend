import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { PoliciesGuard } from "src/casl/policies/policies.guard";
import { AppointmentService } from "./appointment.service";
import { CheckPolicies } from "src/casl/policies/policies.decorator";
import { UpdateAppointmentPolicy } from "./policies/updateAppointment.policy";
import { UpdateAppointmentDTO } from "./dto/updateAppointment.dto";
import { CreateAppointmentDTO } from "./dto/createAppointment.dto";
import { Appointment, User } from "generated/prisma";
import { CreateAppointmentPolicy } from "./policies/createAppointment.policy";
import { DeleteAppointmentPolicy } from "./policies/deleteAppointment.policy";
import { CurrentUser } from "src/auth/currentUser.decorator";

@Controller('appointments')
@UseGuards(PoliciesGuard)
export class AppointmentController {
    constructor(
        private readonly appointmentsService: AppointmentService
    ) {}

    @Post('/')
    @CheckPolicies(new CreateAppointmentPolicy())
    async createAppointment(
        @Body() createAppointmentDTO: CreateAppointmentDTO
    ) {
        return await this.appointmentsService.createAppointment(createAppointmentDTO);
    }

    @Get('/')
    async getAppointments(
        @CurrentUser() user: User,
        @Query('barberId') barberId?: string,
        @Query('clientId') clientId?: string,
    ) {
        return await this.appointmentsService.getAppointments(user, barberId, clientId);
    }

    @Get('/:id')
    async getAppointment(
        @Param('id') id: string,
        @CurrentUser() user: User
    ) {
        return await this.appointmentsService.getAppointment(user, id);
    }

    @Patch(':id')
    @CheckPolicies(new UpdateAppointmentPolicy())
    async updateAppointment(
        @Param('id') id: string,
        @Body() updateAppointmentDTO: UpdateAppointmentDTO
    ) {
        return await this.appointmentsService.updateAppointment(id, updateAppointmentDTO);
    }

    @Delete(':id')
    @CheckPolicies(new DeleteAppointmentPolicy())
    async deleteAppointment(
        @Param('id') id: string,
    ) {
        return await this.appointmentsService.deleteAppointment(id);
    }
}