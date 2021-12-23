import { AxiosRequestConfig } from "axios";
import { Request } from "express";

export function getAxiosConfig(defaultConfig: AxiosRequestConfig<any>, req: Request): AxiosRequestConfig<any> {
    const config = { ...defaultConfig };
    config.headers = { ...config.headers };
    if (req.headers.authorization) {
        config.headers.authorization = req.headers.authorization;
    }
    return config;
}