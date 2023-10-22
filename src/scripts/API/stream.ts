// TS module -------------------------------------------///
import { ref } from "vue";
import { genUuid } from "../UUID";
import { noteGen, fetchFirstNotes } from "../API/note";
import { getUserData } from "../API/userdata";
import { readCookie } from "../cookie";

// Type ------------------------------------------------///
import { ModifiedNote, TimeLine, User } from "../Types/types";

export const provideTimeLine = ref<Record<symbol, { timeLine: TimeLine; isConnected: boolean }>>({});

const captchaNote = (webSocket: WebSocket, noteId: string) => {
  webSocket.send(
    JSON.stringify({
      type: "subNote",
      body: {
        id: noteId,
      },
    })
  );
};



export const streamTimeLine = async (
  host: string,
  timeLineSymbol: symbol,
  token?: string,
  channel: string = "home",
  autoReConnection: boolean = false,
  isReConnect: boolean = false,
) => {
  const
    loginUserData = await getUserData(host, token)

  if (loginUserData) {
    const connectURL = (host.indexOf("https://") == -1) ? host.replace("http", "ws") : host.replace("https", "wss");
    const 
      uuid = genUuid(),
      timeLine = token ? new WebSocket(`${connectURL}/streaming?i=${token}`) : new WebSocket(`ws://${host}/streaming`)

    // Home を homeに変換 トークンが存在しない場合は強制的にローカルに接続
    channel = channel == "Home" ? "home" : !token ? "local" : channel;

    // WebSocket OpenEvent -------------------------------------------------------------------------------------------///
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
      provideTimeLine.value[timeLineSymbol].isConnected = true;
      Object.keys(provideTimeLine.value[timeLineSymbol].timeLine).forEach(index => captchaNote(timeLine, index));
    });


    // fetch first Notes ---------------------------------------------------------------------------------------------///
    if (!isReConnect) {
      provideTimeLine.value[timeLineSymbol] = {
        timeLine: {},
        isConnected: false,
      };
      (await fetchFirstNotes(host, channel, token!))
        .reverse()
        .forEach(note => (provideTimeLine.value[timeLineSymbol].timeLine[note.id] = note));
    } else {
      provideTimeLine.value[timeLineSymbol].isConnected = false;
    }

    
    // WebSocket Get MessageEvent ----------------------------------------------------------------------------------///
    timeLine.addEventListener("message", event => {
      const parseEvent = JSON.parse(event.data).body;
      switch (parseEvent.type) {
        case "note":
          console.log("GetNote!");
          const note = noteGen(parseEvent.body);
          provideTimeLine.value[timeLineSymbol].timeLine[note.id] = note;
          captchaNote(timeLine, note.id);
          break;
        case "reacted":
          console.log("reacted!");
          const targetReaction: string = parseEvent.body.reaction;
          const targetNote: ModifiedNote = provideTimeLine.value[timeLineSymbol].timeLine[parseEvent.id];

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


    // WebSocket CloseEvent ----------------------------------------------------------------------------------------///
    timeLine.addEventListener("close", () => {
      console.log("Connection to TL has been disconnected...");
      if (autoReConnection) streamTimeLine(host, timeLineSymbol, token, channel, autoReConnection, true);
      return;
    });
  }
};

export const streamMain = (host: string, autoReConnection: boolean = false) => {
  const token = readCookie(`${host}_token`).value;
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
