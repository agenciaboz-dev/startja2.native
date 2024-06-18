import { Prisma } from "@prisma/client";
import { LoginForm } from "../types/shared/login";
import { FileUpload, WithoutFunctions } from "./helpers";
import { Notification } from "./Notification";
import { Media } from "./Media";
import { ResaleUser } from "./ResaleUser";
import { Resale } from "./Resale";
import { CustomerUser } from "./CustomerUser";
import { Customer } from "./Customer";
export declare const user_include: {
    notifications: true;
    profilePic: true;
    resales: {
        include: {
            permissions: true;
            resale: {
                include: {
                    permissions: true;
                    profilePic: true;
                };
            };
        };
    };
    resalesManager: {
        include: {
            permissions: true;
            profilePic: true;
        };
    };
    customers: {
        include: {
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
    };
    customersManager: {
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
};
export type UserPrisma = Prisma.UserGetPayload<{
    include: typeof user_include;
}>;
export type UserForm = Omit<WithoutFunctions<User>, "id" | "profilePic" | "created_at" | "notifications" | "expoPushToken" | "admin" | "active" | "resalesManager" | "resales" | "customersManager" | "customers"> & {
    profilePic?: FileUpload | null;
    admin?: boolean;
    active?: boolean;
};
export type PartialUser = Partial<User> & {
    id: string;
};
export declare class User {
    id: string;
    email: string;
    created_at: string;
    password: string;
    name: string;
    phone: string;
    expoPushToken: string[];
    admin: boolean;
    active: boolean;
    notifications: Notification[];
    profilePic: Media | null;
    resalesManager: Resale[];
    resales: ResaleUser[];
    customersManager: Customer[];
    customers: CustomerUser[];
    constructor(id: string, user_prisma?: UserPrisma);
    init(): Promise<void>;
    static list(): Promise<User[]>;
    static newResaleManager(form: UserForm, resale_name: string): Promise<User>;
    static signup(form: UserForm): Promise<User>;
    static login(data: LoginForm): Promise<User | null>;
    static findById(id: string): Promise<User | null>;
    static findByEmail(email: string): Promise<User | null>;
    load(data: UserPrisma): void;
    update(data: Partial<User>): Promise<string | {
        message: string;
        key: string;
    } | undefined>;
    updateImage(data: FileUpload): string;
}
