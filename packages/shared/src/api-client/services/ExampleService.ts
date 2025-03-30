/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ExampleService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static exampleControllerGetExampleData(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/example',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static exampleControllerGetFormattedDate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/example/date',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static exampleControllerCreateSlug(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/example/slug',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static exampleControllerClampNumber(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/example/clamp',
        });
    }
}
