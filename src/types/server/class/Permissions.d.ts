import { Prisma } from "@prisma/client";
import { WithoutFunctions } from "./helpers";
export declare const customer_permissions_include: {
    nfePermissions: true;
};
type CustomerPermissionsPrisma = Prisma.CustomerPermissionsGetPayload<{
    include: typeof customer_permissions_include;
}>;
type NfePermissionsPrisma = Prisma.NfePermissionsGetPayload<{}>;
type ResalePermissionsPrisma = Prisma.ResalePermissionsGetPayload<{}>;
export type ResalePermissionsForm = Omit<WithoutFunctions<ResalePermissions>, "id">;
export declare class ResalePermissions {
    id: number;
    customers: number;
    products: number;
    natures: number;
    editPermissions: boolean;
    inviteUser: boolean;
    constructor(data: ResalePermissionsPrisma);
    static new(form: ResalePermissionsForm): Promise<ResalePermissions>;
}
export declare class NfePermissions {
    id: number;
    emit: boolean;
    edit: boolean;
    cancel: boolean;
    delete: boolean;
    transmit: boolean;
    clone: boolean;
    adjust: boolean;
    renderNumber: boolean;
    manifest: boolean;
    correctionLetter: boolean;
    share: boolean;
    download: boolean;
    history: boolean;
    save_view: boolean;
    constructor(data: NfePermissionsPrisma);
}
export declare class CustomerPermissions {
    id: number;
    enterprises: number;
    products: number;
    natures: number;
    properties: number;
    bank_accounts: number;
    edit_permissions: boolean;
    invite_user: boolean;
    options: boolean;
    report_nfe: number;
    sold_products: number;
    chart_accounts: number;
    nfePermissionsId: number;
    nfePermissions: NfePermissions;
    constructor(data: CustomerPermissionsPrisma);
}
export {};
