/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StringMapDto } from './StringMapDto';

export type StringMapDtoPaginatedResponse = {
    pageNumber?: number;
    pageSize?: number;
    items?: Array<StringMapDto> | null;
    count?: number;
};

