/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StringMapDto } from '../models/StringMapDto';
import type { StringMapDtoPaginatedResponse } from '../models/StringMapDtoPaginatedResponse';
import type { StringMapUpdateDto } from '../models/StringMapUpdateDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StringMapsService {

    /**
     * @param pageNumber
     * @param pageSize
     * @returns StringMapDtoPaginatedResponse Success
     * @throws ApiError
     */
    public static getApiStringMaps(
        pageNumber?: number,
        pageSize?: number,
    ): CancelablePromise<StringMapDtoPaginatedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/StringMaps',
            query: {
                'PageNumber': pageNumber,
                'PageSize': pageSize,
            },
        });
    }

    /**
     * @param requestBody
     * @returns StringMapDto Success
     * @throws ApiError
     */
    public static postApiStringMaps(
        requestBody?: StringMapDto,
    ): CancelablePromise<StringMapDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/StringMaps',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns StringMapDto Success
     * @throws ApiError
     */
    public static getApiStringMaps1(
        id: string,
    ): CancelablePromise<StringMapDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/StringMaps/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns StringMapDto Success
     * @throws ApiError
     */
    public static patchApiStringMaps(
        id: string,
        requestBody?: StringMapUpdateDto,
    ): CancelablePromise<StringMapDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/StringMaps/{id}',
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
    public static deleteApiStringMaps(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/StringMaps/{id}',
            path: {
                'id': id,
            },
        });
    }

}
