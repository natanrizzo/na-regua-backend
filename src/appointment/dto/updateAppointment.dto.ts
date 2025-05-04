import { IsDateString, IsOptional } from "class-validator";

export class UpdateAppointmentDTO {
    @IsOptional()
    @IsDateString()
    dateTime?: string;
}