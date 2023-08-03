<script setup lang="ts">
import '../module/ts/types'

import HeadBar from '../module/Components/HeadBar.vue';

const listData: HamburgerMenuList = [
    {
        title: "MiAuthでログイン",
        link: "/login",
    },
    {
        title: "Tokenでログイン",
        link: "/login/token",
    }
]
</script>

<template>
    <HeadBar
        v-if="$route.name !== 'Callback'"
        :title="`${String($route.name)}でログイン`"
        :listData="listData"
    />
    <router-view />
</template>