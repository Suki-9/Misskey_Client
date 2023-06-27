<template>
    <a>asas</a>
</template>

<script setup>
import Cookie from '@/components/js/Cookie.js'
if (navigator.cookieEnabled) {
    if (Cookie.lead("API_Key") == null){
        document.location = "/login";
    } else {
    }
} else {
    alert("Cookieを有効にしてください。")
}
</script>
