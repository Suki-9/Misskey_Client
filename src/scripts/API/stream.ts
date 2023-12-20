import { VNode } from "vue";
import { genUuid } from "../UUID";
import { Note } from "../API/note";
//import { getUserData } from "../API/userdata";
import cookie from "../cookie";

export class StreamTimeLine {
  public notes: VNode[] = [];
  public webSocket: WebSocket;
  public isConnected: boolean = false;

  private host: string;
  private token: string;
  private channel: string;
  private autoReConnection: boolean;

  constructor(
    host: string,
    token: string,
    channel: string = "home",
    autoReConnection: boolean = false,
  ) {
    this.host = host.replace('https://', '');
    this.token = token;
    this.channel = channel == "Home" ? "home" : !token ? "local" : channel;
    this.autoReConnection = autoReConnection;
    this.webSocket = new WebSocket(`wss://${host}/streaming?i=${this.token}`);
  }

  private captchaNote = (noteId: string) => this.webSocket.send(
    JSON.stringify({
      type: "subNote",
      body: {
        id: noteId,
      },
    })
  );

  public async init(
    // isReConnect: boolean,
  ) {
    this.webSocket.addEventListener("open", () => {
      this.webSocket.send(
        JSON.stringify({
          type: "connect",
          body: {
            channel: `${this.channel}Timeline`,
            id: genUuid(),
            params: {},
          },
        })
      );
      console.log(`Connection to the ${this.channel} TL was successful!`);
      this.isConnected = true;
    });

    this.webSocket.addEventListener("message", event => {
      const parseEvent = JSON.parse(event.data).body;
      switch (parseEvent.type) {
        case "note": {
          console.log("GetNote!");
          this.notes.push(new Note(parseEvent.body, this.host).gen());
          this.captchaNote(parseEvent.body.id);
          break;
        }
        case "reacted": {
          console.log("reacted!");
          //const targetReaction: string = parseEvent.body.reaction;

          //if (parseEvent.body.userId == loginUserData.id) {
          //  targetNote.myReaction = targetReaction;
          //}

          //if (Object.keys(targetNote!.reactions).indexOf(targetReaction) == -1) {
          //  targetNote!.reactions[targetReaction] = 1;
          //} else {
          //  targetNote!.reactions[targetReaction]++;
          //}
          break;
        }
        default:
          console.log(parseEvent);
      }
    });

    this.webSocket.addEventListener("close", () => {
      this.webSocket.removeEventListener('open', () => { });
      this.webSocket.removeEventListener('close', () => { });
      this.webSocket.removeEventListener('message', () => { });
      console.log("Connection to TL has been disconnected...");
      this.autoReConnection && this.reConnect();
    });

    return this.notes;
  }

  public reConnect() {
    this.webSocket = new WebSocket(`wss://${this.host}/streaming?i=${this.token}`);
    this.init();
  }
}

export const streamMain = (host: string, autoReConnection: boolean = false) => {
  const token = cookie.read(`${host}_token`);
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
