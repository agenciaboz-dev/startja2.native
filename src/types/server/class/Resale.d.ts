import { Prisma } from "@prisma/client";
import { Media } from "./Media";
import { ResalePermissions } from "./Permissions";
export declare const resale_include: {
    permissions: true;
    profilePic: true;
};
type ResalePrima = Prisma.ResaleGetPayload<{
    include: typeof resale_include;
}>;
export declare class Resale {
    id: string;
    name: string;
    manager_id: string;
    permissions: ResalePermissions;
    profilePic: Media | null;
    constructor(id: string, data?: ResalePrima);
    load(data: ResalePrima): void;
    init(): Promise<void>;
}
export {};
