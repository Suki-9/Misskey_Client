<template>
    <div>
        <TL />
        <a @click="emo('misskey.io')">絵文字取得しろボタン</a>
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
        async emo(host) {
            const res = await fetch("http://localhost:3000/req/emojis",{
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    host: host,
                }),
            })
            console.log(res.body)
        }
    }
}
</script>

