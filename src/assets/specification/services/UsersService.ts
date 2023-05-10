/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDto } from '../models/UserDto';
import type { UserInputDto } from '../models/UserInputDto';
import type { UserPasswordInputDto } from '../models/UserPasswordInputDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * @returns UserDto Success
     * @throws ApiError
     */
    public static getApiUsers(): CancelablePromise<Array<UserDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Users',
        });
    }

    /**
     * @param requestBody
     * @returns UserDto Success
     * @throws ApiError
     */
    public static postApiUsers(
        requestBody?: UserInputDto,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns UserDto Success
     * @throws ApiError
     */
    public static getApiUsers1(
        id: string,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Users/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns UserDto Success
     * @throws ApiError
     */
    public static putApiUsers(
        id: string,
        requestBody?: UserInputDto,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Users/{id}',
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
    public static deleteApiUsers(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Users/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns UserDto Success
     * @throws ApiError
     */
    public static patchApiUsersPassword(
        id: string,
        requestBody?: UserPasswordInputDto,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Users/{id}/password',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
