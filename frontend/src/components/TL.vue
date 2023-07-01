<template>
    <v-virtual-scroll
        :items="notes"
        height=100vh
        item-height=200
    >
        <template v-slot:default="{ item }">
           <v-card
               width=500
               class="note"
            >
               <div class="note_body" >
                   <img :src="item.user_icon" class="user_icon" />
                   <article>
                        <span>
                            <v-card-title class="note_head">
                                {{ item.user_name }}
                            </v-card-title>

                            <v-card-subtitle>
                                @{{ item.user_id }}
                            </v-card-subtitle>
                        </span>
                        <v-card-text>
                            {{ item.note_text }}
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
                console.log(th.notes)
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
.note_head {
    overflow: hidden;
}
.note_body {
    display: flex;
    padding: 10px;
}
.user_icon {
    border-radius: 50%;
    height: 3em;
    width: 3em;
}
.card_actions {
}
</style>