import { AxiosError, AxiosResponse } from "axios";
import { HttpException, HttpStatus } from '@nestjs/common';

function outgoingInterceptorSuccessHandler(response: AxiosResponse) {
    /**
     * handle outgoing http request response to get data since NESTJS using axios,
     * body will be present in data
     */
    return response.data;
}


function outgoingInterceptorErrorHandler(error: AxiosError) {
    //handle outgoing http request error globally
    return new HttpException(error.response.statusText, error.response.status);
}

export { outgoingInterceptorSuccessHandler, outgoingInterceptorErrorHandler }