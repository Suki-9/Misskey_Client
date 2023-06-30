<template>
    <v-virtual-scroll
        :items="notes"
        height=100vh
        item-height="0"
    >
    <template v-slot:default="{ item }">
        <v-card
            max-width = "400"
            class="mx-auto note_body"
            :elevation="1"
        >
            <v-card-title>
                {{ item.user_name }}
            </v-card-title>
            <v-card-text>
                {{ item.note_text }}
            </v-card-text>
            <v-card-actions
                class="card_actions"
            >
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
            const mainhost = (this.settings.mainhost.bool) ? Cookie.lead("mainhost") : Cookie.lead("hosts").split(",")[1];
            const token = Cookie.lead(`${mainhost}_token`);
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
                },10000);*/
            });
            var th = this
            TL.addEventListener('message', async (event) => {
            console.log("Get Note!")
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
.note_body {
    margin: 5px 0 5px 0;
}
.card_actions {
    justify-content: space-evenly;
}
</style>