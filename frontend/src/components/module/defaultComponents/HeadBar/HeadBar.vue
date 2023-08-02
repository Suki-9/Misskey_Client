<script setup lang="ts">
import { ref } from 'vue';

import { data } from '../../ts/types/headbar';

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
    <HamburgerMenuList v-bind="data"/>
</template>

<style scoped lang="postcss">
.head_bar {
    /* 変数 */
    --component-size: 1.4em;
    
    display: flex;
    align-items: center;

    padding: 0 2% 0 2%;

    border-bottom: solid 1px var(--default-border);

    p {
        margin-left: 1%;

        font-size: calc(var(--component-size)*0.9);
    }
}
</style>