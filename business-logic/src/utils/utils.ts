import assert from "assert";
import { NextFunction, Request, Response } from "express";
import { Profile } from "../models/profile.model";
import { default as jwt } from "jsonwebtoken";
import { AxiosRequestConfig } from "axios";

assert(process.env.DB_API_KEY, "DB_API_KEY not found in .env file!");
assert(process.env.JWT_SECRET, "JWT_SECRET not found in .env file!");

export function filterPublicProfiles(profile: Profile | null): Profile | null {
    if(profile) {
        if(profile.public) {
            return profile;
        } else {
            return {
                _id: profile._id,
                user: profile.user,
                username: profile.username,
                public: false
            }
        }
    } else {
        return null;
    }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        assert(process.env.JWT_SECRET, "JWT_SECRET not found in .env file!");
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    statusCode: 401,
                    message: "Invalid token"
                });
            }
            req.user = decoded;

            next();
        });
    } else {
        return res.status(401).send({
            statusCode: 401,
            message: "No token provided"
        });
    }
}

export const axiosConfig: AxiosRequestConfig<any> = {
    headers: {
        "api-key": process.env.DB_API_KEY
    },
    validateStatus: (_) => {
        return true;
    }
}