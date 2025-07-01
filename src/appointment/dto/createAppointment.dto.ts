import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateAppointmentDTO {
    @IsNotEmpty()
    serviceId: string;

    @IsNotEmpty()
    clientId: string;

    @IsNotEmpty()
    @IsDateString()
    dateTime: string;
}