/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StringMapDto } from './StringMapDto';

export type UserDto = {
    id?: string;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    roleId?: string;
    role?: StringMapDto;
    organizationId?: string | null;
    organization?: StringMapDto;
};

