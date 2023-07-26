<script setup lang="ts">
import { ref } from 'vue'

const menu_open = ref<boolean>(false)
</script>

<template>
    <div class="hamburger_menu" @click="menu_open = !menu_open">
        <span v-show="!menu_open" ></span>
        <span class="cross_L" :class="(menu_open) ? 'active' : ''" ></span>
        <span class="cross_R" :class="(menu_open) ? 'active' : ''" v-show="menu_open"></span>
        <span v-show="!menu_open" ></span>
    </div>
</template>

<style scoped lang="postcss">
.hamburger_menu {
    --component-size: 1.2em;

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    position: relative;

    margin: calc(var(--component-size) / 12);

    height: var(--component-size);
    width: var(--component-size);

    & span {
        margin: 0px;

        width: var(--component-size);
        height: calc(var(--component-size) / 6);

        background-color: var(--default-text-color);

        border-radius: 2px;
    }
    .cross_L.active,.cross_R.active {
        position: absolute;

        animation-duration: 0.2s;
        animation-fill-mode: forwards;
        animation-timing-function: ease;

        transform: rotate(0deg);
    }
    .cross_L.active { animation-name: cross_L; }
    .cross_R.active { animation-name: cross_R; }
}
@keyframes cross_L {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(45deg); }
}
@keyframes cross_R {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(-45deg); }
}
</style>