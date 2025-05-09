import { Appointment } from "generated/prisma";

export class TransactionModel {
    constructor(
        public id: string,
        public appointmentId?: string,
        public productId?: string,
        public amount?: number,
        public createdAt?: Date,
        public appointment?: Appointment
    ) {}
}