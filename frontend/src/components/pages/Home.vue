<script setup lang="ts">
import TimeLine from '../module/TimeLine.vue';
import BottomBar from '../module/BottomBar.vue';

import { read } from '../module/ts/Cookie';
import { useRouter } from 'vue-router';
const router = useRouter()


/* トークンの有無を確認 */
const loginHost: string | undefined = read('loginHost')
const Hosts: string | undefined = read('Hosts')

if (loginHost == undefined)
    router.push('/login')
else if (Hosts?.split(',').indexOf(String(loginHost)) == null) 
    document.cookie = `Hosts=${loginHost},${(Hosts == undefined) ? "" : read('Hosts')}; path=/`

</script>


<template>
    <TimeLine 
        :hostName="loginHost"
        :channel="'hybrid'"/>
    <BottomBar />
</template>