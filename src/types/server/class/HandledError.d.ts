import { Response } from "express";
export declare class HandledError {
    message: string;
    type: string;
    constructor(message: string);
    static handleResponse(error: unknown, response: Response): void;
}
