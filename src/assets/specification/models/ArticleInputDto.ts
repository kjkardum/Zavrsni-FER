/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ArticleType } from './ArticleType';

export type ArticleInputDto = {
    title?: string | null;
    description?: string | null;
    price?: number;
    active?: boolean;
    categoryId?: string;
    type?: ArticleType;
};

