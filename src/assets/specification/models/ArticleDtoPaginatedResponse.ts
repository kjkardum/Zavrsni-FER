/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ArticleDto } from './ArticleDto';

export type ArticleDtoPaginatedResponse = {
    pageNumber?: number;
    pageSize?: number;
    items?: Array<ArticleDto> | null;
    count?: number;
};

