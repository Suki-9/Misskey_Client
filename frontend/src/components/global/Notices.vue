<script setup lang="ts">
import { getNotifications } from '../../scripts/API/notification'
import { readCookie } from '../../scripts/Cookie';


const host = readCookie("loginHost")
if (host !== undefined) {
    getNotifications(host)
}
</script>


<template>
    
</template>


<style module lang="postcss">

</style>