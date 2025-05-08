import { AbilityBuilder, PureAbility, InferSubjects } from "@casl/ability";
import { createPrismaAbility, PrismaQuery } from "@casl/prisma";
import { Injectable } from "@nestjs/common";
import { User } from "generated/prisma";
import { Role } from "src/auth/roles/role.enum";
import { AppointmentModel } from "src/models/appointment.model";
import { ProductModel } from "src/models/product.model";
import { ServiceModel } from "src/models/service.model";
import { TransactionModel } from "src/models/transaction.model";
import { UserModel } from "src/models/user.model";

type Action = 'manage' | 'create' | 'read' | 'update' | 'delete';

type Subjects = 
    | InferSubjects<typeof AppointmentModel> 
    | InferSubjects<typeof UserModel> 
    | InferSubjects<typeof ProductModel>
    | InferSubjects<typeof ServiceModel>
    | InferSubjects<typeof TransactionModel>
    |'all';

export type AppAbility = PureAbility<[Action, Subjects], PrismaQuery>;

@Injectable()
export class AbilityFactory {
    defineAbilityFor(user: User) {
        const { can, cannot, rules } = new AbilityBuilder<AppAbility>(PureAbility);

        if (user.role === 'Administrator') {
            can('manage', 'all');
    
        } else if (user.role === 'Barber') {
            // User
            cannot('create', UserModel);
            can('read', UserModel);
            can('update', UserModel, { id: user.id });
            cannot('delete', UserModel);

            // Product Rules
            cannot('create', ProductModel);
            can('read', ProductModel);
            cannot('update', ProductModel);
            cannot('delete', ProductModel);

            // Appointment Rules
            cannot('create', AppointmentModel);
            can('read', AppointmentModel, { barberId: user.id });
            cannot('update', AppointmentModel);
            cannot('delete', AppointmentModel);

            // Service Rules
            cannot('create', ServiceModel);
            can('read', ServiceModel);
            cannot('update', ServiceModel);
            cannot('delete', ServiceModel);

            // Transaction Rules
            cannot('read', TransactionModel);

        } else {
            // User Rules
            cannot('create', UserModel);
            can('read', UserModel);
            can('update', UserModel, { id: user.id, role: Role.Client });
            cannot('delete', UserModel);

            //Product Rules
            cannot('create', ProductModel);
            can('read', ProductModel);
            cannot('update', ProductModel);
            cannot('delete', ProductModel);

            // Appointment Rules
            can('create', AppointmentModel);
            can('read', AppointmentModel, { clientId: user.id });
            can('update', AppointmentModel, { clientId: user.id });
            can('delete', AppointmentModel, { clientId: user.id });

            // Service Rules
            cannot('create', ServiceModel);
            can('read', ServiceModel);
            cannot('update', ServiceModel);
            cannot('delete', ServiceModel);

            // Transaction Rules
            cannot('read', TransactionModel);
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

            if (object instanceof ServiceModel) {
                return ServiceModel;
            }

            if (object instanceof TransactionModel) {
                return TransactionModel;
            }

            return (object as any).constructor;
        }

        return createPrismaAbility(rules, { detectSubjectType });
    }
}