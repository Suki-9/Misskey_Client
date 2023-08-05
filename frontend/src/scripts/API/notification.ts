//types
import { NotificationFilterTypes, postData } from '../types'

//TS module
import { readCookie } from '../Cookie';


export const getNotifications = async (
    host: string,
    token?: string,
    maxSize: number = 1,
    following: boolean = false,
    unreadOnly: boolean = false,
    markAsRead: boolean = false,
    includeTypes?: NotificationFilterTypes[],
    excludeTypes?: NotificationFilterTypes[],
) => {
    const res = await fetch(
        `https://${host}/api/i/notifications`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                i: token ?? readCookie(`${host}_token`),
                limit: maxSize,
                following: following,
                unreadOnly: unreadOnly,
                markAsRead: markAsRead,
                includeTypes: includeTypes,
                excludeTypes: excludeTypes,
            }),
        }
    )
        .then(response => response.json())
        .then(data => data);
}