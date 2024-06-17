import { Prisma } from "@prisma/client";
import { Media } from "./Media";
import { ResalePermissions, ResalePermissionsForm } from "./Permissions";
import { FileUpload, WithoutFunctions } from "./helpers";
import { UserForm } from "./User";
export declare const resale_include: {
    permissions: true;
    profilePic: true;
};
type ResalePrima = Prisma.ResaleGetPayload<{
    include: typeof resale_include;
}>;
export type ResaleForm = Omit<WithoutFunctions<Resale>, "id" | "manager_id" | "permissions" | "profilePic"> & {
    profilePic?: FileUpload;
    manager: UserForm;
    permissions: ResalePermissionsForm;
};
export declare class Resale {
    id: string;
    name: string;
    manager_id: string;
    permissions: ResalePermissions;
    profilePic: Media | null;
    constructor(id: string, data?: ResalePrima);
    static list(): Promise<Resale[]>;
    load(data: ResalePrima): void;
    init(): Promise<void>;
}
export {};
