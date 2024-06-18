import { Prisma } from "@prisma/client";
import { Resale } from "./Resale";
import { ResalePermissions, ResalePermissionsForm } from "./Permissions";
import { WithoutFunctions } from "./helpers";
import { UserForm } from ".";
export declare const resaleuser_include: {
    permissions: true;
    resale: {
        include: {
            permissions: true;
            profilePic: true;
        };
    };
};
type ResaleUserPrisma = Prisma.ResaleUserGetPayload<{
    include: typeof resaleuser_include;
}>;
export type ResaleUserForm = Omit<WithoutFunctions<ResaleUser>, "id" | "user_id" | "permissions" | "resale"> & {
    user: UserForm;
    permissions: ResalePermissionsForm;
};
export declare class ResaleUser {
    id: string;
    user_id: string;
    resale_id: string;
    permissions: ResalePermissions;
    resale: Resale;
    constructor(id: string, data?: ResaleUserPrisma);
    static new(form: ResaleUserForm): Promise<ResaleUser>;
    init(): Promise<void>;
    load(data: ResaleUserPrisma): void;
}
export {};
