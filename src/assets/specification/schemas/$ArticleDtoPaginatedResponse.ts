/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ArticleDtoPaginatedResponse = {
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
                type: 'ArticleDto',
            },
            isNullable: true,
        },
        count: {
            type: 'number',
            format: 'int32',
        },
    },
} as const;
