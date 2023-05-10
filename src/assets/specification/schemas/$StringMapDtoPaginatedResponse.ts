/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $StringMapDtoPaginatedResponse = {
    properties: {
        pageNumber: {
            type: 'number',
            format: 'int32',
        },
        pageSize: {
            type: 'number',
            format: 'int32',
        },
        items: {
            type: 'array',
            contains: {
                type: 'StringMapDto',
            },
            isNullable: true,
        },
        count: {
            type: 'number',
            format: 'int32',
        },
    },
} as const;
