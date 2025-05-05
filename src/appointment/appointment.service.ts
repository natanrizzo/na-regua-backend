import { Injectable } from "@nestjs/common";
import { Appointment } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAppointmentDTO } from "./dto/createAppointment.dto";
import { UpdateAppointmentDTO } from "./dto/updateAppointment.dto";

@Injectable()
export class AppointmentService {
    constructor(
        private readonly prisma: PrismaService
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

    async getAppointment(id: string): Promise<Appointment | undefined> {
        return await this.prisma.appointment.findUnique({
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
    }

    async getAppointments(): Promise<Appointment[]> {
        return await this.prisma.appointment.findMany({
            include: {
                barber: {
                    omit: { password: true },
                },
                client: {
                    omit: { password: true }
                }
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
}