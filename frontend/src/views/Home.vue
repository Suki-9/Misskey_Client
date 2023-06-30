<template>
    <div>
        <TL />
        <a @click="emo_search(':oyasumisskey::hyper_vibecat:','misskey.io')">絵文字取得しろボタン</a>
    </div>
</template>

<script>
import Cookie from '@/components/js/Cookie.js';
import TL from "@/components/TL.vue";

export default {
    setup() {
        if (navigator.cookieEnabled) {
            if (Cookie.lead("hosts") == null){
                document.location = "/login";
            } else {
            }
        } else {
            alert("Cookieを有効にしてください。")
        }
    },
    methods: {
        async emo_get(host) {
            await fetch("http://localhost:3000/req/emojis/get",{
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    host: host,
                })
            })
        },
        async emo_search(query,host) {
            const res = await fetch("http://localhost:3000/req/emojis/search",{
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: query,
                    host: host,
                }),
            }).then((response) => response.json()).then((data) => {return data});

            if (res.msg !== "success!") {
                emo_search(query,host)
            }
        }
    }
}
</script>

