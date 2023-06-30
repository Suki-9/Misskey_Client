<template>
    <TL />
</template>

<script>
import Cookie from '@/components/js/Cookie.js';
import TL from "@/components/TL.vue";

export default {
    components: { 
        TL
    },
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
    }
}
</script>

