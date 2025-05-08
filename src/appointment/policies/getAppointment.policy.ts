import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { AppointmentModel } from "src/models/appointment.model";

export class GetAppointmentPolicy implements PolicyHandler {
    handle(
        ability: AppAbility, 
        context?: any): boolean {
        const appointment = new AppointmentModel(
            '',
            new Date(),
            '',
            '',
            '',
        );

        return ability.can('read', appointment);
    }
}