import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Appointment, User } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAppointmentDTO } from "./dto/createAppointment.dto";
import { UpdateAppointmentDTO } from "./dto/updateAppointment.dto";
import { Role } from "src/auth/roles/role.enum";
import { AbilityFactory } from "src/casl/ability.factory";
import { accessibleBy } from "@casl/prisma";
import { AppointmentModel } from "src/models/appointment.model";

@Injectable()
export class AppointmentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly abilityFactory: AbilityFactory,
    ) {}

    async createAppointment({ serviceId, clientId, barberId, dateTime }: CreateAppointmentDTO): Promise<Appointment> {
        return await this.prisma.appointment.create({
            data: {
                dateTime,
                service: {
                    connect: { id: serviceId }
                },
                client: {
                    connect: { id: clientId }
                },
                barber: {
                    connect: { id: barberId }
                }
            }
        })
    }

    async getAppointment(user: User, id: string): Promise<Appointment | undefined> {
        const appt = await this.prisma.appointment.findUnique({
            where: { id },
            include: {
                barber: {
                    omit: { password: true } 
                },
                client: {
                    omit: { password: true }
                },
                service: true,
                transactions: true
            }
        });

        if (!appt) throw new NotFoundException(`Appointment ${id} not found`);

        const subject = new AppointmentModel(
            appt.id,
            appt.dateTime,
            appt.serviceId,
            appt.clientId,
            appt.barberId
        );

        const ability = this.abilityFactory.defineAbilityFor(user);
        if (!ability.can('read', subject)) {
            throw new ForbiddenException(`You cannot access appointment ${id}`);
        }
        
        return appt;
    }

    async getAppointments(
        user: User, 
        barberIdOverride?: string, 
        clientIdOverride?: string
    ): Promise<Appointment[]> {
        let whereFilter;

        if (user.role === 'Administrator') {
            if (barberIdOverride) {
                whereFilter = { barberId: barberIdOverride };
            }
            if (clientIdOverride) {
                whereFilter = { clientId: clientIdOverride };
            }
        } else {
            if (user.role === 'Barber') {
                whereFilter = { barberId: user.id }
            }
            if (user.role === 'Client') {
                whereFilter = { clientId: user.id }
            }
        }

        return await this.prisma.appointment.findMany({
            where: whereFilter,
            include: {
                barber: { omit: { password: true } },
                client: { omit: { password: true } },
                service: true,
                transactions: true
            }
        });
    }

    async updateAppointment(id: string, { dateTime }: UpdateAppointmentDTO) {
        return await this.prisma.appointment.update({
            where: { id },
            data: {
                dateTime,
            },
        });
    }

    async deleteAppointment(id: string) {
        return await this.prisma.appointment.delete({
            where: { id }
        });
    }
}