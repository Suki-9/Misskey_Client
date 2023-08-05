import { NotificationFilterTypes } from '../types'

export const getNotifications = async (
    host: string,
    token: string,
    maxSize: number = 10,
    includeTypes: NotificationFilterTypes[] = [],
    excludeTypes: NotificationFilterTypes[] = []
) => {
    const postData = {
        i: token,
        limit: maxSize,
        includeTypes: includeTypes,
        excludeTypes: excludeTypes,
    }
    const res = await fetch(
        `https://${host}/api/notes/${channel}timeline`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        }
    )
    console.log(res)
}