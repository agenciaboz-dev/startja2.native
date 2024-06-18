import { Prisma } from "@prisma/client";
import { Media } from "./Media";
import { ResalePermissions, ResalePermissionsForm } from "./Permissions";
import { FileUpload, WithoutFunctions } from "./helpers";
import { User, UserForm } from "./User";
export declare const resale_include: {
    permissions: true;
    profilePic: true;
};
type ResalePrima = Prisma.ResaleGetPayload<{
    include: typeof resale_include;
}>;
export type ResaleForm = Omit<WithoutFunctions<Resale>, "id" | "manager_id" | "permissions" | "profilePic" | "created_at"> & {
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
    created_at: string;
    constructor(id: string, data?: ResalePrima);
    static findById(id: string): Promise<Resale | null>;
    static list(): Promise<Resale[]>;
    static new(form: ResaleForm): Promise<Resale>;
    load(data: ResalePrima): void;
    init(): Promise<void>;
    updateProfilePic(image: FileUpload): Promise<void>;
    getManagers(): Promise<User[]>;
}
export {};
