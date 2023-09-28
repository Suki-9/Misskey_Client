// TS module -------------------------------------------///
import { ref } from "vue";
import { genUuid } from "../UUID";
import { noteGen, fetchFirstNotes } from "../API/note";
import { readCookie } from "../cookie";

// Type ------------------------------------------------///
import { ModifiedNote, TimeLine } from "../types";

export const provideTimeLine = ref<Record<symbol, TimeLine>>({});

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
  isReConnect: boolean = false,
) => {
  const token = readCookie(`${host}_token`).unwrap();
  const uuid = genUuid();
  const timeLine = new WebSocket(`wss://${host}/streaming?i=${token}`);

  channel = channel == "Home" ? "home" : channel;
  provideTimeLine.value[timeLineSymbol] = {};

  //fetch first Notes
  if (!isReConnect) {
    (await fetchFirstNotes(host, channel)).forEach(note => {
      provideTimeLine.value[timeLineSymbol][note.id] = note;
    });
  }

  timeLine.addEventListener("open", () => {
    console.log(`Connection to the ${channel} TL was successful!`);
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
        captchaNote(timeLine, provideTimeLine.value[timeLineSymbol][0]);
        break;
      case "reacted":
        console.log("reacted!");
        const targetReaction: string = parseEvent.body.reaction;
        const targetNote: ModifiedNote = provideTimeLine.value[timeLineSymbol][Object.keys(provideTimeLine.value[timeLineSymbol]).indexOf(parseEvent.id)];

        //if (parseEvent.body.userId == targetNote.user.id) { targetNote.myReaction = targetReaction; }
        if (Object.keys(targetNote!.reactions).indexOf(targetReaction) == -1) {
          targetNote!.reactions[targetReaction] = 1;
        } else {
          targetNote!.reactions[targetReaction]++;
        }
        break;
      default:
        console.log(JSON.parse(event.data));
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
