/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        email: {
            type: 'string',
            isNullable: true,
        },
        firstName: {
            type: 'string',
            isNullable: true,
        },
        lastName: {
            type: 'string',
            isNullable: true,
        },
        roleId: {
            type: 'string',
            format: 'uuid',
        },
        role: {
            type: 'StringMapDto',
        },
        organizationId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        organization: {
            type: 'StringMapDto',
        },
    },
} as const;
