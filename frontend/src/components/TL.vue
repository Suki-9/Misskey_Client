<template>
    <div class="TL" id="TL">
    </div>
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
            mainhost: "",
        }
    },
    methods: {
        TL() {
            const mainhost = (this.settings.mainhost.bool) ? Cookie.lead("mainhost") : Cookie.lead("hosts").split(",")[1];
            const token = Cookie.lead(`${mainhost}_token`);
            const uuid = UUID.Gen();
            const TL = new WebSocket(`wss://${mainhost}/streaming?i=${token}`);
            TL.addEventListener('open', (event) => {
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
            TL.onmessage = function(event) {
                note.Gen(event.data);
            };
        }
    },
    mounted() {
        this.TL()
    }
}
</script>

<style>
@import './css/pc/TL.css';
</style>
