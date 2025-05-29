export interface StatusError extends Error {
    httpStatusCode?: number;
    statusCode?: number;
}
