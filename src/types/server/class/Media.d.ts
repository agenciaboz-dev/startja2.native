import { Prisma } from "@prisma/client";
type MediaPrisma = Prisma.MediaGetPayload<{}>;
export type MediaType = "image" | "document";
export declare class Media {
    id: string;
    url: string;
    name: string;
    type: MediaType;
    constructor(data: MediaPrisma);
}
export {};
