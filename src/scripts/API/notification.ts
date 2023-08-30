//types
import { NotificationType, ModifiedNotification, Notification } from "../types";

//TS module
import { readCookie } from "../cookie";
import { parseEmoji, searchEmoji } from "../emoji";
import { noteGen } from "./note";

//vue Component functions
import { addNotificationsBefore } from "../../pages/Notifications.vue";


export const getNotifications = async (
  host: string,
  untilId?: string,
  token = readCookie(`${host}_token`).unwrap(),
  maxSize = 20,
  following = false,
  unreadOnly = false,
  markAsRead = false,
  includeTypes?: NotificationType[],
  excludeTypes?: NotificationType[]
) => {
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
        untilId: untilId,
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
  res.map(notification => addNotificationsBefore(notificationGen(notification)));
};

export const notificationGen = (notification: Notification): ModifiedNotification => {
  notification.user ??= {
    name: null,
    avatarUrl: "",
    username: "",
  }
  notification.user.name ??= notification.user.username;

  const ModifiedNotification: ModifiedNotification = {
    id: notification.id,
    type: notification.type,
    user: {
      name: parseEmoji(notification.user.name),
      username: notification.user.username,
      avatarUrl: notification.user.avatarUrl,
    }
  }

  switch (notification.type) {
    // @ts-ignore
    case "renote": {
      ModifiedNotification.text = notification.note.text && parseEmoji(notification.note.text)
      break;
    }

    case "reply": {
      ModifiedNotification.text = notification.note.reply?.text && parseEmoji(notification.note.reply.text)
      ModifiedNotification.note = noteGen(notification.note)
      break;
    }

    case "quote": {
      ModifiedNotification.note = noteGen(notification.note)
      break;
    }

    case "reaction": { 
      ModifiedNotification.text = notification.note.text && parseEmoji(notification.note.text)
      ModifiedNotification.reaction =
        notification.reaction ? {
          name: notification.reaction,
          link: searchEmoji(
            notification.reaction.slice(1, notification.reaction.indexOf("@"))
          ).unwrap_or(""),
        } : undefined
      break;
    }
    default:
      break;
  }
  

  return ModifiedNotification
};
