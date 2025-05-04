export class AppointmentModel {
    constructor(
        public id: string,
        public date: Date,
        public serviceId: string,
        public clientId: string,
        public barberId: string,
    ) {}
}