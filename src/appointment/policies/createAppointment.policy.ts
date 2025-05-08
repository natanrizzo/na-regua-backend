import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { AppointmentModel } from "src/models/appointment.model";

export class CreateAppointmentPolicy implements PolicyHandler {
    handle(
        ability: AppAbility, 
        context: {
            body: any
        }): boolean {
        const appointment = new AppointmentModel(
            '',
            new Date(context.body.date),
            context.body.serviceId,
            context.body.clientId,
            context.body.barberId,
        );
        
        return ability.can('create', appointment);
    }
}