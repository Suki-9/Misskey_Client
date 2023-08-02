<script setup lang="ts">
import { ref } from 'vue';

import '../ts/types'

import HamburgerMenuButton from './HamburgerMenuButton.vue';
import HamburgerMenuList from './HamburgerMenuList.vue';

defineProps<{ title?: string; listData: HamburgerMenuList }>();

const active = ref<boolean>(false)
</script>


<template>
    <div :class="$style.root">
        <HamburgerMenuButton 
            :active="active"
            @switch="active = !active"/>
        <h4>{{ title }}</h4>
    </div>
    <HamburgerMenuList
        v-show="active"
        :listData="listData"
        @switch="active = !active"/>
</template>


<style module lang="postcss">
.root {
    display: flex;
    align-items: center;
    flex-direction: row;

    width: 100%;

    border-bottom: solid 1px var(--primary-border-color);
}
</style>