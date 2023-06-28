<template>
    <TL />
</template>

<script setup>
import Cookie from '@/components/js/Cookie.js';
import TL from "@/components/TL.vue";

if (navigator.cookieEnabled) {
    if (Cookie.lead("hosts") == null){
        document.location = "/login";
    } else {
    }
} else {
    alert("Cookieを有効にしてください。")
}
</script>
