/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ArticleImageDto } from './ArticleImageDto';
import type { ArticleTagDto } from './ArticleTagDto';
import type { ArticleType } from './ArticleType';

export type ArticleDto = {
    id?: number;
    title?: string | null;
    description?: string | null;
    price?: number;
    active?: boolean;
    categoryId?: string;
    type?: ArticleType;
    images?: Array<ArticleImageDto> | null;
    articleTags?: Array<ArticleTagDto> | null;
};