/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ArticleTagDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        articleId: {
            type: 'string',
            format: 'uuid',
        },
        tagValueId: {
            type: 'string',
            format: 'uuid',
        },
        tagValue: {
            type: 'StringMapDto',
        },
    },
} as const;
