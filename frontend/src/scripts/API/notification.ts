//types
import { NotificationType, ModifiedNotification, Notification } from '../types'

//TS module
import { readCookie } from '../Cookie';
import { parseEmoji, searchEmoji } from '../emoji';
import { noteGen } from './note';


export const getNotifications = async (
    host: string,
    token?: string,
    maxSize: number = 20,
    following: boolean = false,
    unreadOnly: boolean = false,
    markAsRead: boolean = false,
    includeTypes?: NotificationType[],
    excludeTypes?: NotificationType[],
): Promise<ModifiedNotification[]> => {
    const res: Notification[] = await fetch(
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

	return res.map(Notification => notificationGen(Notification))
}

const notificationGen = (Notification: Notification): ModifiedNotification => { 
	Notification.user.name ??= Notification.user.username;

    return {
        id: Notification.id,
        user: {
            name: (Notification.user.name !== null) ? parseEmoji(Notification.user.name) : Notification.user.username,
            username: Notification.user.username,
            avatarUrl: Notification.user.avatarUrl,
        },
		type: Notification.type,
		text: Notification.note.text && parseEmoji(Notification.note.text),
		//note: noteGen(Notification.note),
		reaction: (Notification.reaction !== undefined) ? {
			name: Notification.reaction,
			link: searchEmoji(Notification.reaction.slice(1, Notification.reaction.indexOf("@"))).unwrap_or(""),
		} : undefined
    }
}