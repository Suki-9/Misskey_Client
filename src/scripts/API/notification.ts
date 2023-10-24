//TS module --------------------------------------------///
import { parseEmoji, searchEmoji } from "../emoji";
import { noteGen } from "./note";

export const notificationGen = (notification: Mi_Notification, host: string): ModifiedNotification => {
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
      name: parseEmoji(notification.user.name, host),
      username: notification.user.username,
      avatarUrl: notification.user.avatarUrl,
    },
  };

  switch (notification.type) {
    case "renote": {
      ModifiedNotification.text = notification.note.text && parseEmoji(notification.note.text, host);
      break;
    }

    case "reply": {
      ModifiedNotification.text = notification.note.reply?.text && parseEmoji(notification.note.reply.text, host);
      ModifiedNotification.note = noteGen(notification.note, host);
      break;
    }

    case "quote": {
      ModifiedNotification.note = noteGen(notification.note, host);
      break;
    }

    case "reaction": {
      ModifiedNotification.text = notification.note.text && parseEmoji(notification.note.text, host);
      ModifiedNotification.reaction = notification.reaction
        ? {
            name: notification.reaction,
            link: searchEmoji(notification.reaction, host).value,
          }
        : undefined;
      break;
    }
    default:
      break;
  }

  return ModifiedNotification;
};
