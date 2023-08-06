//TS module
import { genUuid } from "../UUID";
import { readCookie } from "../cookie";
import { noteGen } from "./note";
import { notificationGen } from "./notification";

//vue Component functions
import { addNote } from "../../components/global/TimeLine.vue";
import { addNotifications } from  "../../components/global/NotificationView.vue";


export const streamTimeLine = (
    host: string,
    channel?: string,
    autoReConnection: boolean = false
) => {
  const token = readCookie(`${host}_token`).unwrap();
  const uuid = genUuid();
  channel = channel  ?? "home"

  const timeLine = new WebSocket(
    `wss://${host}/streaming?i=${token}`
  );

  timeLine.addEventListener("open", () => {
    timeLine.send(
      JSON.stringify({
        type: "connect",
        body: {
          channel: `${channel}Timeline`,
          id: uuid,
          params: {},
        },
      })
    );
    console.log("Connection to the TL was successful!");
  });

  timeLine.addEventListener("message", event => {
    console.log("GetNote!");
    addNote(noteGen(JSON.parse(event.data).body.body))
  });

  timeLine.addEventListener("close", () => {
    console.log("Connection to TL has been disconnected...");
    streamTimeLine(host, channel, autoReConnection);
    return;
  });
}

export const streamMain = (
    host: string,
    autoReConnection: boolean = false,
) => {
  const token = readCookie(`${host}_token`).unwrap();
  const uuid = genUuid();

  const timeLine = new WebSocket(
    `wss://${host}/streaming?i=${token}`
  );

  timeLine.addEventListener("open", () => {
    timeLine.send(
      JSON.stringify({
        type: "connect",
        body: {
          channel: "main",
          id: uuid,
          params: {},
        },
      })
    );
    console.log("Connection to the main was successful!");
  });

  timeLine.addEventListener("message", event => {
    console.log("GetEvent!");
    const gentEvent = JSON.parse(event.data).body

    switch (gentEvent.type) {
      case "notification":
        addNotifications(notificationGen(JSON.parse(event.data).body.body))
        break;
    
      default:
        break;
    }
  });

  timeLine.addEventListener("close", () => {
    console.log("Connection to main has been disconnected...");
    streamMain(host, autoReConnection);
    return;
  });
}