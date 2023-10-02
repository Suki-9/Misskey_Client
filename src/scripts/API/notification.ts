// Types -----------------------------------------------///
import { ModifiedNotification, Notification } from "../types";

//TS module --------------------------------------------///
import { parseEmoji, searchEmoji } from "../emoji";
import { noteGen } from "./note";

export const notificationGen = (notification: Notification): ModifiedNotification => {
  notification.user ??= {
    id: "",
    name: null,
    avatarUrl: "",
    username: "",
  };
  notification.user.name ??= notification.user.username;

  const ModifiedNotification: ModifiedNotification = {
    id: notification.id,
    type: notification.type,
    user: {
      id: notification.user.id,
      name: parseEmoji(notification.user.name),
      username: notification.user.username,
      avatarUrl: notification.user.avatarUrl,
    },
  };

  switch (notification.type) {
    case "renote": {
      ModifiedNotification.text = notification.note.text && parseEmoji(notification.note.text);
      break;
    }

    case "reply": {
      ModifiedNotification.text = notification.note.reply?.text && parseEmoji(notification.note.reply.text);
      ModifiedNotification.note = noteGen(notification.note);
      break;
    }

    case "quote": {
      ModifiedNotification.note = noteGen(notification.note);
      break;
    }

    case "reaction": {
      ModifiedNotification.text = notification.note.text && parseEmoji(notification.note.text);
      ModifiedNotification.reaction = notification.reaction
        ? {
            name: notification.reaction,
            link: searchEmoji(notification.reaction).unwrap_or(""),
          }
        : undefined;
      break;
    }
    default:
      break;
  }

  return ModifiedNotification;
};
