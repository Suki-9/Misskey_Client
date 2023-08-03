<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { read } from '../ts/Cookie'

const router = useRouter()
const route = useRoute();


const session = route.query['session']
const host = read('loginHost')
const res = await fetch(`https://${host}/api/miauth/${session}/check`, { method: 'POST' })
    .then((response) => response.json())
    .then((data) => { return data });

document.cookie = `${host}_token=${await res.token}; path=/`
router.push('/')
</script>

<template>
    <p style="text-align: center;">少し待ってね。</p>
</template>