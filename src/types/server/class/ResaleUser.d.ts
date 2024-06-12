import { Prisma } from "@prisma/client";
import { Resale } from "./Resale";
import { ResalePermissions } from "./Permissions";
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
export declare class ResaleUser {
    id: string;
    user_id: string;
    resale_id: string;
    permissions: ResalePermissions;
    resale: Resale;
    constructor(id: string, data?: ResaleUserPrisma);
    init(): Promise<void>;
    load(data: ResaleUserPrisma): void;
}
export {};
