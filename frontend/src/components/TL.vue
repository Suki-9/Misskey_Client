<template>
    <v-virtual-scroll
        :items="items" 
    >
    <template v-slot:default="{ item }">
        <v-card
            class="mx-auto"
            width="400"
            prepend-icon="mdi-home"
        >
            <template v-slot:title>
            {{ item.user_name }}
            </template>

            <v-card-text>
                {{ item.note_text }}
            </v-card-text>
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
            items: [
                {   
                    id: 0,
                    user_name: "テストユーザー",
                    user_id: "hogehoge",
                    user_icon: "hoge.com",
                    note_id: "piyopiyo",
                    note_text: "こんにちは 世界!",
                    note_atter: "note",
                }
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
                }));
                setTimeout(() => {
                    TL.send(JSON.stringify({
                        type: 'disconnect',
                        body: {
                            channel: 'localTimeline',
                            id: uuid,
                        }
                    }))
                },10000);
            });
            TL.onmessage = function(event) {
                note.Gen(event.data,mainhost);
            };
        }
    },
    mounted() {
        //this.TL()
    }
}
</script>