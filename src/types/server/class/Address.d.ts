import { Prisma } from "@prisma/client";
type AddressPrisma = Prisma.AddressGetPayload<{}>;
export type AddressForm = Omit<Address, 'id'>;
export declare class Address {
    id: number;
    cep: string;
    uf: string;
    city: string;
    number: string;
    district: string;
    street: string;
    complement: string | null;
    constructor(data: AddressPrisma);
}
export {};
