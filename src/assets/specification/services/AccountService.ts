/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginDto } from '../models/LoginDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AccountService {

    /**
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static postApiAccountLogin(
        requestBody?: LoginDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Account/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
