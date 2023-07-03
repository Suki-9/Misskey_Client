<template>
    <div>
        <v-card
            :class="{'pt-1': loading === true, 'pa-0': loading === false}"
            :loading="loading"
            elevation="0"
            
        ></v-card>
        
        <v-virtual-scroll
            class="h-100"
            :items="notes"
            v-scroll.self="onScroll"
            v-if="notes.length!==0"
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
                            <p
                                class=""
                            >
                                <span v-html="item.user_name"></span>
                                <span 
                                    v-text="item.user_id"
                                    class="text-body-2 text-medium-emphasis"
                                ></span>
                                <span 
                                    v-text="item.date"
                                    class="text-disabled text-body-2 float-end"
                                ></span>
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
    </div>
</template>

<script>
import Cookie from '@/components/js/Cookie.js';
import UUID from '@/components/js/UUID.js';
import note from '@/components/js/note.js';

export default {
    props: ['attr'],
    data() {
        return {
            settings: {
                mainhost: {
                    bool: true,
                }
            },
            window_Width: window.outerWidth,
            //消すな、壊れる。
            refresh: true,
            loading: true,
            offsetTop: 0,
            notes: [
            ],
            notes_inbox: [
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
                        channel: `${this.attr}Timeline`,
                        id: uuid,
                        params: {}
                    }
                }));
            });
            let th = this;
            TL.addEventListener('message', async (event) => {
                const note_data = await note.Gen(await JSON.parse(event.data).body.body,mainhost);
                if (th.offsetTop < 200) {
                    th.notes.unshift(note_data);
                    if (th.notes.length > 30)
                        th.notes.pop()
                    console.log("Note -> TL!")
                } else {
                    th.notes_inbox.unshift(note_data);
                    if (th.notes_inbox.length > 30)
                        th.notes_inbox.pop()
                    console.log("Note -> InBox!")
                }
            });
        },
        async get_note() {
            const mainhost = (this.settings.mainhost.bool) ? Cookie.read("mainhost") : Cookie.read("hosts").split(",")[1];
            const token = Cookie.read(`${mainhost}_token`);
            const res = await fetch(`https://${mainhost}/api/notes/${(this.attr == "home") ? "" : `${this.attr}-`}timeline`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    i: token,
                    withFiles: false,
                    excludeNsfw: false,
                    limit: 30,
                }),
            }).then((response) => response.json()).then((data) => {return data});

            for (let i = 0;i < res.length;i++) {
                const note_data = await note.Gen(await res[i],mainhost);
                this.notes.push(note_data)
                this.loading = (i==29) ? false : true
                console.log(this.loading)
            }
        },
        onScroll (e) {
            this.offsetTop = e.target.scrollTop
            console.log(this.offsetTop)
            if (this.offsetTop < 200) {
                for (let i = 0;i < this.notes_inbox.length;i++){
                    this.notes.unshift(this.notes_inbox[i]);
                    if (this.notes.length > 30)
                        this.notes.pop()
                    console.log("Note -> TL!")
                }
                this.notes_inbox = []
            }
        },
    },
    created() {
        this.get_note()
        this.stream()
    },
}
</script>

<style>
.user_name_emoji {
    height: 1.2em;
    margin: 0 2px 0 2px;
}
.note_text_emoji {
    height: 1.5em;
    margin: 0 3px 0 3px;
}
</style>