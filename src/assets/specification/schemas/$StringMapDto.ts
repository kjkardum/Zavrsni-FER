/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $StringMapDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        stringMapType: {
            type: 'string',
            isNullable: true,
        },
        value: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
