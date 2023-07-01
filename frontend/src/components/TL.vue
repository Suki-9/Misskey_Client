<template>
    <v-virtual-scroll
        :items="notes"
        height=100vh
        itemHeight=50
    >
        <template v-slot:default="{ item }">
           <v-card
               width=500
               elevation="0"
               class="note"
            >
               <div class="note_body" >
                   <img :src="item.user_icon" class="user_icon" />
                   <article>
                        <v-card-title class="note_head">
                            <span v-html="item.user_name" class="user_name"></span>
                        </v-card-title>
                        <v-card-subtitle>
                            @{{ item.user_id }}
                        </v-card-subtitle>
                        <v-card-text >
                            <span v-html="item.note_text" class="note_text"></span>
                        </v-card-text>
                        <v-card-actions class="card_actions">
                            <v-btn>
                                <i class="icon-comment"></i>
                            </v-btn>
                            <v-btn>
                                <i class="icon-retweet"></i>
                            </v-btn>
                            <v-btn>
                                <i class="icon-plus-squared-alt"></i>
                            </v-btn>
                       </v-card-actions>
                   </article>
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
                    bool: false,
                    text: "d",
                }
            },
            notes: [
            ],
            mainhost: "",
        }
    },
    methods: {
        TL() {
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
                }));/*
                setTimeout(() => {
                    TL.send(JSON.stringify({
                        type: 'disconnect',
                        body: {
                            channel: 'localTimeline',
                            id: uuid,
                        }
                    }))
                },60000);*/
            });
            var th = this
            TL.addEventListener('message', async (event) => {
                const note_data = await note.Gen(event.data,mainhost);
                th.notes.unshift(note_data);
            });
        }
    },
    mounted() {
        this.TL()
    }
}
</script>

<style>
.note {
    margin: 5px auto 5px auto;
}
.note_body {
    display: flex;
    padding: 10px;
}
.user_name {
    display: flex;
    align-items: center;
}
.user_icon {
    border-radius: 50%;
    height: 3em;
    width: 3em;
}
.user_name_emoji {
    height: 1em;
    margin: 0 2px 0 2px;
}
.note_text_emoji {
    height: 1.5em;
    margin: 0 3px 0 3px;
}
.note_text {
    font-size: 1.1em; 
    overflow-wrap: break-word;
    white-space: pre-wrap;
}
</style>