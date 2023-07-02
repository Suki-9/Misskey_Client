<template>
    <v-virtual-scroll
      :items="notes"
      height="100vh"
    >
        <template v-slot:default="{ item }">
            <v-card
                class="ma-3 pa-3"
            >
                <div
                    class="ma-0 d-flex"
                >
                    <a :href="`/user?${item.user_id}`"><img 
                        class="rounded-circle"
                        width="60"
                        height="60"
                        :src="item.user_icon"
                    ></a>
                    <v-sheet
                        class="pl-3"
                        :width=this.window_Width*0.86-60
                    >
                        <p class="d-flex note_head">
                            <span v-html="item.user_name"></span>
                            <span v-text="item.user_id"></span>
                        </p>
                        <sheet-footer
                        
                        >
                            <span v-html="item.note_text"></span>
                        </sheet-footer>
                        <v-card-actions
                            class="pa-0"
                        >
                            <v-btn 
                                variant="text"
                            >
                                <i class="icon-comment"></i>
                            </v-btn>
                            <v-btn 
                                variant="text"
                            >
                                <i class="icon-retweet"></i>
                            </v-btn>
                            <v-btn 
                                variant="text"
                            >
                                <i class="icon-plus-squared"></i>
                            </v-btn>
                        </v-card-actions>
                        <sheet-footer
                            class="ma-0 pa-0 text-caption d-flex flex-row-reverse"
                        >
                            note_id : {{ item.note_id }}
                        </sheet-footer>
                    </v-sheet>
                </div>
            </v-card>
        </template>
    </v-virtual-scroll>
</template>

<script>
import Cookie from '@/components/js/Cookie.js';
import UUID from '@/components/js/UUID.js';
import note from '@/components/js/note.js';

export default {
    data() {
        return {
            settings: {
                mainhost: {
                    bool: true,
                }
            },
            window_Width: window.outerWidth,
            refresh: true,
            offsetTop: 0,
            notes: [
            ],
        }
    },
    methods: {
        stream() {
            const mainhost = (this.settings.mainhost.bool) ? Cookie.read("mainhost") : Cookie.read("hosts").split(",")[1];
            const token = Cookie.read(`${mainhost}_token`);
            const uuid = UUID.Gen();
            const TL = new WebSocket(`wss://${mainhost}/streaming?i=${token}`);
            TL.addEventListener('open', () => {
                console.log("Join success!")
                TL.send(JSON.stringify({
                    type: 'connect',
                    body: {
                        channel: 'localTimeline',
                        id: uuid,
                        params: {}
                    }
                }));
            });
            let th = this;
            let notes_inbox = [];
            TL.addEventListener('message', async (event) => {
                const note_data = await note.Gen(await JSON.parse(event.data).body.body,mainhost);
                if (th.offsetTop <= 100) {
                    for (let i = 0;i < notes_inbox.length;i++){
                        th.notes.unshift(notes_inbox[i])
                    }
                    th.notes.unshift(note_data);
                } else {
                    notes_inbox.unshift(note_data);
                }
            });
        },
        async get_note() {
            const mainhost = (this.settings.mainhost.bool) ? Cookie.read("mainhost") : Cookie.read("hosts").split(",")[1];
            const token = Cookie.read(`${mainhost}_token`);
            const res = await fetch(`https://${mainhost}/api/notes/local-timeline`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    i: token,
                    withFiles: false,
                    excludeNsfw: false,
                    limit: 10,
                }),
            }).then((response) => response.json()).then((data) => {return data});

            for (let i = 0;i < res.length;i++) {
                const note_data = await note.Gen(await res[i],mainhost);
                this.notes.push(note_data)
            }
        },
    },
    mounted() {
        this.get_note()
        this.stream()
    }
}
</script>

<style>
.note_head {
    display: flex;
    white-space: nowrap;
    overflow: hidden;
}
.user_name_emoji {
    height: 1.2em;
    margin: 0 2px 0 2px;
}
.note_text_emoji {
    height: 1.5em;
    margin: 0 3px 0 3px;
}
</style>