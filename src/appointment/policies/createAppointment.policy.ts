import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { AppointmentModel } from "src/models/appointment.model";

export class CreateAppointmentPolicy implements PolicyHandler {
    handle(
        ability: AppAbility
    ): boolean {
        return ability.can('create', AppointmentModel);
    }
}