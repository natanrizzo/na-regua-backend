import { AbilityBuilder, PureAbility, InferSubjects } from "@casl/ability";
import { createPrismaAbility, PrismaQuery } from "@casl/prisma";
import { Injectable } from "@nestjs/common";
import { User } from "generated/prisma";
import { AppointmentModel } from "src/models/appointment.model";

type Action = 'manage' | 'create' | 'read' | 'update' | 'delete';
type Subjects = InferSubjects<typeof AppointmentModel> | 'all';
export type AppAbility = PureAbility<[Action, Subjects], PrismaQuery>;

@Injectable()
export class AbilityFactory {
    defineAbilityFor(user: User) {
        const { can, cannot, rules } = new AbilityBuilder<AppAbility>(PureAbility);

        if (user.role === 'Administrator') {
            can('manage', 'all');
        } else {
            can('read', AppointmentModel);
            can('update', AppointmentModel, { barberId: user.id });
            cannot('delete',AppointmentModel);
        }

        function detectSubjectType(object: unknown): any {
            if (object instanceof AppointmentModel) {
                return AppointmentModel;
            }
            return (object as any).constructor;
        }

        return createPrismaAbility(rules, { detectSubjectType });
    }
}