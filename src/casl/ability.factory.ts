import { AbilityBuilder, PureAbility, InferSubjects } from "@casl/ability";
import { createPrismaAbility, PrismaQuery } from "@casl/prisma";
import { Injectable } from "@nestjs/common";
import { User } from "generated/prisma";
import { AppointmentModel } from "src/models/appointment.model";
import { ProductModel } from "src/models/product.model";
import { UserModel } from "src/models/user.model";

type Action = 'manage' | 'create' | 'read' | 'update' | 'delete';

type Subjects = 
    InferSubjects<typeof AppointmentModel> 
    | InferSubjects<typeof UserModel> 
    | InferSubjects<typeof ProductModel>
    |'all';

export type AppAbility = PureAbility<[Action, Subjects], PrismaQuery>;

@Injectable()
export class AbilityFactory {
    defineAbilityFor(user: User) {
        const { can, cannot, rules } = new AbilityBuilder<AppAbility>(PureAbility);

        if (user.role === 'Administrator') {
            can('manage', 'all');
    
        } else if (user.role === 'Barber') {
            can('create', AppointmentModel);
            can('read', AppointmentModel, { barberId: user.id });
            can('update', AppointmentModel, { barberId: user.id });
            cannot('delete', AppointmentModel);

            cannot('create', ProductModel);
            can('read', ProductModel);
            cannot('update', ProductModel);
            cannot('delete', ProductModel);

        } else {
            // User Rules
            can('create', UserModel);
            can('read', UserModel);
            can('update', UserModel, { id: user.id });
            cannot('delete', UserModel);

            //Product Rules
            cannot('create', ProductModel);
            can('read', ProductModel);
            cannot('update', ProductModel);
            cannot('delete', ProductModel);

            // Appointment Rules
            cannot('create', AppointmentModel);
            can('read', AppointmentModel, { clientId: user.id });
            cannot('update', AppointmentModel);
            cannot('delete',AppointmentModel);
        }

        function detectSubjectType(object: unknown): any {
            if (object instanceof AppointmentModel) {
                return AppointmentModel;
            }

            if (object instanceof UserModel) {
                return UserModel;
            }

            if (object instanceof ProductModel) {
                return ProductModel;
            }

            return (object as any).constructor;
        }

        return createPrismaAbility(rules, { detectSubjectType });
    }
}