import { Prisma } from "@prisma/client";
import { Customer } from "./Customer";
import { CustomerPermissions } from "./Permissions";
export declare const customer_user_include: {
    customer: {
        include: {
            address: true;
            permissions: {
                include: {
                    nfePermissions: true;
                };
            };
            profilePic: true;
        };
    };
    permissions: {
        include: {
            nfePermissions: true;
        };
    };
};
type CustomerUserPrisma = Prisma.CustomerUserGetPayload<{
    include: typeof customer_user_include;
}>;
export declare class CustomerUser {
    id: string;
    user_id: string;
    customer_id: string;
    permissions: CustomerPermissions;
    customer: Customer;
    constructor(id: string, data?: CustomerUserPrisma);
    init(): Promise<void>;
    load(data: CustomerUserPrisma): void;
}
export {};
