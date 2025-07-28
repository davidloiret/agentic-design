import { BaseEntity } from '../../../shared/libs/base-entity';
export declare class User extends BaseEntity {
    email: string;
    firstName: string;
    lastName: string;
    supabaseId?: string;
    constructor(email: string, firstName: string, lastName: string, supabaseId?: string);
}
