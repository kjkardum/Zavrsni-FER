/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ArticleDto = {
    properties: {
        id: {
            type: 'number',
            format: 'int32',
        },
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
        images: {
            type: 'array',
            contains: {
                type: 'ArticleImageDto',
            },
            isNullable: true,
        },
        articleTags: {
            type: 'array',
            contains: {
                type: 'ArticleTagDto',
            },
            isNullable: true,
        },
    },
} as const;
