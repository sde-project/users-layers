import { initializeApp } from "firebase-admin/app";
import { getMessaging, MulticastMessage } from "firebase-admin/messaging";
import Device from "../models/devices.model";
import axios, { AxiosRequestConfig } from "axios";
import { axiosConfig } from "./utils";

const firebase = initializeApp();
const messaging = getMessaging(firebase);

export default async function sendNotification(notification:{title:string,body:string,icon?:string}, users:string[]): Promise<void> {
    const results = await Promise.all<string[]>(users.map(async (user: string) => {
        const tokens = await axios.get<Device[]>(process.env.DB_URL + "/devices/user/" + user, axiosConfig);
        if (tokens.status == 200) {
            return tokens.data.map(token => token.token ?? "");
        } else {
            return [];
        }
    }));

    const tokens: string[] = results.flat();

    if (tokens.length > 0) {

        const message: MulticastMessage = {
            notification: {
                title: notification.title,
                body: notification.body,
                imageUrl: notification.icon
            },
            tokens: tokens
        };

        const result = await messaging.sendMulticast(message);

        //delete all tokens that produced an error and update "last_used" for the ones that run succesfully
        if (result.failureCount > 0) {
            await Promise.all(result.responses.map(async (response, idx) => {
                const token = await axios.get<Device>(process.env.DB_URL + "/devices/token/" + tokens[idx], axiosConfig);

                if (token.status == 200) {

                    if (!response.success) {
                        await axios.delete(process.env.DB_URL + "/devices/id/" + token.data._id, axiosConfig);
                    } else {
                        await axios.put(process.env.DB_URL + "/devices/id/" + token.data._id, { last_used: new Date() }, axiosConfig);
                    }

                }

            }));
        }

    }
}