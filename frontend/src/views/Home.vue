<template>
    <TL />
    <a @click="emo">絵文字取得しろボタン</a>
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
        emo() {
            console.log("あ")
            fetch("http://localhost:3000/req/emojis",{
                method: 'POST',
                body: JSON.stringify({
                    host: "misskey.io",
                });
            })
        }
    }
}
</script>

