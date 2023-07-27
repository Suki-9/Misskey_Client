<script setup lang="ts">
import { ref } from 'vue';

import { data } from './types';

import HamburgerMenuIcon from './HamburgerMenuIcon.vue';
import HamburgerMenuList from './HamburgerMenuList.vue';

//変数名をどうにかする
const data = ref<data>({
    active: false,
    selectItemId: 0,
    listItems: [
        {
            title: "MiAuthでログイン",
            link: "/login",
            id: 0,
        },
        {
            title: "Tokenでログイン",
            link: "login/token",
            id: 1,
        },
    ],
})
</script>

<template>
    <div class="head_bar">
        <HamburgerMenuIcon
            :active="data.active"
            @switch="data.active = !data.active"
            /><p>{{ data.listItems[data.selectItemId].title }}</p>
    </div>
    <HamburgerMenuList :list-items="data.listItems"/>
</template>

<style scoped lang="postcss">
.head_bar {
    display: flex;
    align-items: center;

    width: 98%;

    padding: 0 1% 0 1%;

    border-bottom: solid 1px var(--default-border);

    p {
        margin-left: 1%;

        font-size: 1.5em;
    }
}
</style>