/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArticleDto } from '../models/ArticleDto';
import type { ArticleDtoPaginatedResponse } from '../models/ArticleDtoPaginatedResponse';
import type { ArticleImageDto } from '../models/ArticleImageDto';
import type { ArticleImageInputDto } from '../models/ArticleImageInputDto';
import type { ArticleImageOrderInputDto } from '../models/ArticleImageOrderInputDto';
import type { ArticleInfoInputDto } from '../models/ArticleInfoInputDto';
import type { ArticleInputDto } from '../models/ArticleInputDto';
import type { ArticlePriceInputDto } from '../models/ArticlePriceInputDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ArticlesService {

    /**
     * @param pageNumber
     * @param pageSize
     * @returns ArticleDtoPaginatedResponse Success
     * @throws ApiError
     */
    public static getApiArticles(
        pageNumber?: number,
        pageSize?: number,
    ): CancelablePromise<ArticleDtoPaginatedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Articles',
            query: {
                'PageNumber': pageNumber,
                'PageSize': pageSize,
            },
        });
    }

    /**
     * @param requestBody
     * @returns ArticleDto Success
     * @throws ApiError
     */
    public static postApiArticles(
        requestBody?: ArticleInputDto,
    ): CancelablePromise<ArticleDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Articles',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns ArticleDto Success
     * @throws ApiError
     */
    public static getApiArticles1(
        id: number,
    ): CancelablePromise<ArticleDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Articles/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns ArticleDto Success
     * @throws ApiError
     */
    public static putApiArticles(
        id: number,
        requestBody?: ArticleInputDto,
    ): CancelablePromise<ArticleDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Articles/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiArticles(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Articles/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns ArticleDto Success
     * @throws ApiError
     */
    public static patchApiArticlesPrice(
        id: number,
        requestBody?: ArticlePriceInputDto,
    ): CancelablePromise<ArticleDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Articles/{id}/price',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns ArticleDto Success
     * @throws ApiError
     */
    public static patchApiArticlesInfo(
        id: number,
        requestBody?: ArticleInfoInputDto,
    ): CancelablePromise<ArticleDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Articles/{id}/info',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns ArticleDto Success
     * @throws ApiError
     */
    public static patchApiArticlesToggleActive(
        id: number,
    ): CancelablePromise<ArticleDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Articles/{id}/toggleActive',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @returns ArticleImageDto Success
     * @throws ApiError
     */
    public static getApiArticlesImages(
        id: number,
    ): CancelablePromise<Array<ArticleImageDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Articles/{id}/images',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns ArticleImageDto Success
     * @throws ApiError
     */
    public static postApiArticlesImages(
        id: number,
        requestBody?: ArticleImageInputDto,
    ): CancelablePromise<ArticleImageDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Articles/{id}/images',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @param imageId
     * @param requestBody
     * @returns ArticleImageDto Success
     * @throws ApiError
     */
    public static patchApiArticlesImagesOrder(
        id: number,
        imageId: string,
        requestBody?: ArticleImageOrderInputDto,
    ): CancelablePromise<ArticleImageDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Articles/{id}/images/{imageId}/order',
            path: {
                'id': id,
                'imageId': imageId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @param imageId
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiArticlesImages(
        id: number,
        imageId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Articles/{id}/images/{imageId}',
            path: {
                'id': id,
                'imageId': imageId,
            },
        });
    }

}
