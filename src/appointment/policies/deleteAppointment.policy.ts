import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { AppointmentModel } from "src/models/appointment.model";

export class DeleteAppointmentPolicy implements PolicyHandler {
    handle(
        ability: AppAbility, 
        context: {
            params: { id: string }
        }): boolean {
            const appointment = new AppointmentModel(
                context.params.id,
                new Date(),
                '',
                '',
                ''
            );

            return ability.can('delete', appointment);
    }
}