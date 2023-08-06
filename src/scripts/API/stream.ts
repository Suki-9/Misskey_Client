//TS module
import { genUuid } from "../UUID"
import { readCookie } from "../cookie"
import { noteGen } from "./note";

//vue Component functions
import { addNote } from "../../components/global/TimeLine.vue";


export const streamEventHandler = () => { 

}

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
    console.log("Connection success!");
  });

  timeLine.addEventListener("message", event => {
    console.log("GetNote!");
    addNote(noteGen(JSON.parse(event.data).body.body))
  });

  timeLine.addEventListener("close", () => {
    console.log("Connection to main has been disconnected...");
    streamTimeLine(host, channel, autoReConnection);
    return;
  });
}