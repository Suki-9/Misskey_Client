//types
import { NotificationType, ModifiedNotification, Notification } from "../types";

//TS module
import { readCookie } from "../cookie";
import { parseEmoji, searchEmoji } from "../emoji";

export const getNotifications = async (
  host: string,
  token = readCookie(`${host}_token`).unwrap(),
  maxSize = 20,
  following = false,
  unreadOnly = false,
  markAsRead = false,
  includeTypes?: NotificationType[],
  excludeTypes?: NotificationType[]
): Promise<ModifiedNotification[]> => {
  const res: Notification[] = await fetch(
    `https://${host}/api/i/notifications`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        i: token,
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

  return res.map(notification => notificationGen(notification));
};

const notificationGen = (notification: Notification): ModifiedNotification => {
  notification.user.name ??= notification.user.username;

  return {
    id: notification.id,
    user: {
      name: parseEmoji(notification.user.name),
      username: notification.user.username,
      avatarUrl: notification.user.avatarUrl,
    },
    type: notification.type,
    text: notification.note.text && parseEmoji(notification.note.text),
    //note: noteGen(notification.note),
    reaction: notification.reaction
      ? {
          name: notification.reaction,
          link: searchEmoji(
            notification.reaction.slice(1, notification.reaction.indexOf("@"))
          ).unwrap_or(""),
        }
      : undefined,
  };
};
