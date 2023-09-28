// TS module -------------------------------------------///
import { ref, type Ref } from "vue";
import { genUuid } from "../UUID";
import { noteGen, fetchFirstNotes } from "../API/note";
import { getUserData } from "../API/userdata";
import { readCookie } from "../cookie";

// Type ------------------------------------------------///
import { ModifiedNote, TimeLine, User } from "../types";

export const provideTimeLine: Ref<Record<symbol, TimeLine>> = ref<Record<symbol, TimeLine>>({});

const captchaNote = (webSocket: WebSocket, note: ModifiedNote) => {
  webSocket.send(
    JSON.stringify({
      type: "subNote",
      body: {
        id: note.id,
      },
    })
  );
};

export const streamTimeLine = async (
  host: string,
  timeLineSymbol: symbol,
  channel: string = "home",
  autoReConnection: boolean = false,
  isReConnect: boolean = false
) => {
  const token = readCookie(`${host}_token`).unwrap();
  const loginUserData: User = JSON.parse(await getUserData(host));
  const uuid = genUuid();
  const timeLine = new WebSocket(`wss://${host}/streaming?i=${token}`);

  channel = channel == "Home" ? "home" : channel;

  //fetch first Notes
  if (!isReConnect) {
    provideTimeLine.value[timeLineSymbol] = {};
    (await fetchFirstNotes(host, channel)).forEach(note => (provideTimeLine.value[timeLineSymbol][note.id] = note));
  }

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
    console.log(`Connection to the ${channel} TL was successful!`);
    Object.keys(provideTimeLine.value[timeLineSymbol]).forEach(index =>
      captchaNote(timeLine, provideTimeLine.value[timeLineSymbol][index])
    );
  });

  timeLine.addEventListener("message", event => {
    const parseEvent = JSON.parse(event.data).body;
    switch (parseEvent.type) {
      case "note":
        console.log("GetNote!");
        const note = noteGen(parseEvent.body);
        provideTimeLine.value[timeLineSymbol][note.id] = note;
        captchaNote(timeLine, provideTimeLine.value[timeLineSymbol][note.id]);
        break;
      case "reacted":
        console.log("reacted!");
        const targetReaction: string = parseEvent.body.reaction;
        const targetNote: ModifiedNote = provideTimeLine.value[timeLineSymbol][parseEvent.id];

        if (parseEvent.body.userId == loginUserData.id) {
          targetNote.myReaction = targetReaction;
        }

        if (Object.keys(targetNote!.reactions).indexOf(targetReaction) == -1) {
          targetNote!.reactions[targetReaction] = 1;
        } else {
          targetNote!.reactions[targetReaction]++;
        }
        break;
      default:
        console.log(parseEvent);
    }
  });

  timeLine.addEventListener("close", () => {
    console.log("Connection to TL has been disconnected...");
    if (autoReConnection) streamTimeLine(host, timeLineSymbol, channel, autoReConnection, true);
    return;
  });
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
