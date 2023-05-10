/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ArticleInputDto = {
    properties: {
        title: {
            type: 'string',
            isNullable: true,
        },
        description: {
            type: 'string',
            isNullable: true,
        },
        price: {
            type: 'number',
            format: 'double',
        },
        active: {
            type: 'boolean',
        },
        categoryId: {
            type: 'string',
            format: 'uuid',
        },
        type: {
            type: 'ArticleType',
        },
    },
} as const;
