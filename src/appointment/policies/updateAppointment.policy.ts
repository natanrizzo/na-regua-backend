import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { AppointmentModel } from "src/models/appointment.model";

export class UpdateAppointmentPolicy implements PolicyHandler {
    handle(
        ability: AppAbility, 
        context: { 
            params: { id: string }; 
            body: any 
    }): boolean {
        const appointment = new AppointmentModel(
            context.params.id,
            new Date(context.body.dateTime),
            context.body.serviceId,
            context.body.clientId,
            context.body.barberId
        )

        return ability.can('update', appointment);
    }
}