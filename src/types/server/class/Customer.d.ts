import { Prisma } from "@prisma/client";
import { CustomerPermissions } from "./Permissions";
import { Media } from "./Media";
import { Address } from "./Address";
export declare const customer_include: {
    address: true;
    permissions: {
        include: {
            nfePermissions: true;
        };
    };
    profilePic: true;
};
type CustomerPrisma = Prisma.CustomerGetPayload<{
    include: typeof customer_include;
}>;
export type FunruralType = "paycheck" | "production_value";
export declare class Customer {
    id: string;
    document: string;
    name: string;
    business_name: string;
    email: string;
    phone: string;
    municipal_registration: string;
    state_registration: string;
    exempted: boolean;
    discriminate_taxes: boolean;
    send_destinatary_mail: boolean;
    enable_nfe: boolean;
    enable_nfce: boolean;
    next_nfe_number: string;
    nfe_series: string;
    funrural: FunruralType;
    certificate_file: string;
    certificate_password: string;
    address_id: number;
    permissionsId: number;
    managerId: string;
    profilePicId: string | null;
    profilePic: Media | null;
    address: Address;
    permissions: CustomerPermissions;
    constructor(id: string, data: CustomerPrisma);
    init(): Promise<void>;
    load(data: CustomerPrisma): void;
}
export {};
