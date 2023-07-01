<template>
    <v-virtual-scroll
        :items="notes"
        height=100vh
        itemHeight=50
    >
        <template v-slot:default="{ item }">
            <div class="note">
                <a :href="item.user_url">
                   <img :src="item.user_icon" class="user_icon" />
                </a>
                <div class="note_body">
                    <p class="note_head">
                        <span v-html="item.user_name" class="user_name" ></span>
                        <span class="user_id" v-text="item.user_id"></span>
                    </p>

                    <p class="note_text"><span v-html="item.note_text"></span></p>
                    
                    <div class="card_actions">
                        <v-btn variant="text">
                            <i class="icon-comment"></i>
                        </v-btn>
                        <v-btn variant="text">
                            <i class="icon-retweet"></i>
                        </v-btn>
                        <v-btn variant="text">
                            <i class="icon-plus-squared"></i>
                        </v-btn>
                    </div>
                </div>
            </div>
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
    display: flex;

    width: max(500px,500px);

    margin: 5px auto 5px auto;
    padding: 10px;

    border-radius: 24px 8px 8px 8px;

    background-color: rgb(255, 255, 255);
}
.note_head {
    display: flex;
    flex-wrap: nowrap;
    align-items: baseline;
    
    position: relative;

    max-width: 430px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    padding: 0 0 0 1rem;
}
.user_name {
    display: flex;
    align-items: center;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    font-size: 1.2em;
}
.user_id {
    display: flex;
    align-items: center;
    text-overflow: ellipsis;

    margin: 0 0 0 5px;

    font-size: 0.8em;
    color: rgb(82, 82, 82);
}
.note_text {
    padding: 2px 0 2px 1rem;
    font-size: 0.9em;
    
    overflow-wrap: break-word;
    white-space: pre-wrap;
}
.user_icon {
    border-radius: 50%;
    height: 50px;
    width: 50px;
}
.user_name_emoji {
    height: 1.2em;
    margin: 0 2px 0 2px;
}
.note_text_emoji {
    height: 1.5em;
    margin: 0 3px 0 3px;
}
.card_actions {
    padding: 2px 0 2px 1rem;
}
</style>