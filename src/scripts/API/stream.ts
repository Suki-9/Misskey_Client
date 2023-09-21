// TS module -------------------------------------------///
import { ref } from "vue";
import { genUuid } from "../UUID";
import { noteGen } from "../API/note";
import { readCookie } from "../cookie";
import { fetchMisskeyAPI } from "./fetchAPI";


// Type ------------------------------------------------///
import { ModifiedNote } from "../types"


export const provideTimeLine = ref<Record<symbol, ModifiedNote[]>>({});

export const streamTimeLine = (
  host: string,
  channel: string = "home",
  autoReConnection: boolean = false,
) => {
  const token = readCookie(`${host}_token`).unwrap();
  const uuid = genUuid();
  const timeLineSymbol = Symbol(uuid);
  const timeLine = new WebSocket(`wss://${host}/streaming?i=${token}`);

  provideTimeLine.value[timeLineSymbol] = [];

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
    provideTimeLine.value[timeLineSymbol].unshift(
      noteGen(JSON.parse(event.data).body.body)
    );
  });

  timeLine.addEventListener("close", () => {
    console.log("Connection to TL has been disconnected...");
    if (autoReConnection) streamTimeLine(host, channel, autoReConnection);
    return;
  });

  return timeLineSymbol;
};



export const streamMain = (host: string, autoReConnection: boolean = false) => {
  const token = readCookie(`${host}_token`).unwrap();
  const uuid = genUuid();

  const timeLine = new WebSocket(`wss://${host}/streaming?i=${token}`);

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
    const gentEvent = JSON.parse(event.data).body;

    switch (gentEvent.type) {
      case "notification":
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
};
