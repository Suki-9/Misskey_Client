<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

import formInput from '../Components/FormInput.vue';


let host = ref<string>('')

const input = (text: string) => { host.value = text }
const login = (text: string) => {
    document.cookie = `${host.value}_token=${text}; path=/`
    document.cookie = `loginHost=${host.value}; path=/`
    
    router.push('/')
}
</script>

<template>
    <formInput 
        :class="$style.input"
        :title="'Host name'"
        @receive="input"/>
    <formInput 
        :class="$style.input"
        :title="'Your Token'"
        :button="{ enable: true, title: 'login!' }"
        @receive="login"/>
</template>

<style module lang="postcss">
.input {
    margin-top: 5%;
}
</style>