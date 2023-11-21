//TS module --------------------------------------------///
import { Emoji } from "../emoji";
import { noteGen } from "./note";

export const notificationGen = (notification: Mi_Notification, host: string): ModifiedNotification => {
  const emoji = new Emoji(host);
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
      name: emoji.parse(notification.user.name),
      username: notification.user.username,
      avatarUrl: notification.user.avatarUrl,
    },
  };

  switch (notification.type) {
    case "renote": {
      ModifiedNotification.text = notification.note.text && emoji.parse(notification.note.text);
      break;
    }

    case "reply": {
      ModifiedNotification.text = notification.note.reply?.text && emoji.parse(notification.note.reply.text);
      ModifiedNotification.note = noteGen(notification.note, host);
      break;
    }

    case "quote": {
      ModifiedNotification.note = noteGen(notification.note, host);
      break;
    }

    case "reaction": {
      ModifiedNotification.text = notification.note.text && emoji.parse(notification.note.text);
      ModifiedNotification.reaction = notification.reaction
        ? {
            name: notification.reaction,
            link: emoji.search(notification.reaction) ?? notification.reaction,
          }
        : undefined;
      break;
    }
    default:
      break;
  }

  return ModifiedNotification;
};
