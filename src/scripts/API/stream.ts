import { genUuid } from "../UUID";
import { fetchFirstNotes } from "../API/note";
import cookie from "../cookie";
import { ref, type Ref } from "vue";

export class StreamTimeLine {
  private host: string;
  private token: string;
  private channel: string;
  private autoReConnection: boolean;

  private notes = ref<Mi_Note[]>([]);

  public webSocket: WebSocket;
  public isConnected: boolean = false;

  constructor(
    host: string,
    token: string,
    channel: string = "home",
    autoReConnection: boolean = false,
  ) {
    this.host = host;
    this.token = token;
    this.channel = channel == "Home" ? "home" : !token ? "local" : channel;
    this.autoReConnection = autoReConnection;
    this.webSocket = new WebSocket(`${this.host.replace('http', 'ws')}/streaming?i=${this.token}`);
  }

  private captchaNote = (noteId: string): void => this.webSocket.send(
    JSON.stringify({
      type: "subNote",
      body: {
        id: noteId,
      },
    })
  );

  public async init(
    isReConnect: boolean = false,
  ): Promise<Ref<Mi_Note[]>> {
    this.webSocket.addEventListener("open", async (): Promise<void> => {
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

      if (!isReConnect) {
        this.notes.value = await fetchFirstNotes(this.host, this.channel, this.token);
        this.notes.value.forEach(n => this.captchaNote(n.id));
      }

      console.log(`Connection to the ${this.channel} TL was successful!`);
      this.isConnected = true;
    });

    this.webSocket.addEventListener("message", event => {
      const parseEvent = JSON.parse(event.data).body;
      switch (parseEvent.type) {
        case "note": {
          console.log("GetNote!");
          this.captchaNote(parseEvent.body.id);
          this.notes.value.unshift(parseEvent.body);
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

        case "deleted": { 
          console.log("deleted");
          this.notes.value = this.notes.value.filter(n => n.id !== parseEvent.id);
          break;
        }

        default:
          console.log(parseEvent);
      }
    });

    this.webSocket.addEventListener("close", () => {
      console.log("Connection to TL has been disconnected...");
      this.autoReConnection && this.reConnect();
    });


    return this.notes;
  }

  public reConnect() {
    this.webSocket = new WebSocket(`${this.host.replace('http', 'ws')}/streaming?i=${this.token}`);
    this.init(true);
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
