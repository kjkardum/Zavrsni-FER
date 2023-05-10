/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ArticleImageDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        order: {
            type: 'number',
            format: 'int32',
        },
        url: {
            type: 'string',
            isNullable: true,
        },
        altText: {
            type: 'string',
            isNullable: true,
        },
        articleId: {
            type: 'number',
            format: 'int32',
        },
    },
} as const;
