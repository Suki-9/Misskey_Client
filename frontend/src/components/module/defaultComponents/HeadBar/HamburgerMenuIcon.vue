<script setup lang="ts">
defineProps<{
    active: boolean;
}>();
defineEmits<{(e: 'switch'): void}>();
</script>

<template>
    <div :class="$style.hamburger_menu" @click="$emit('switch')">
        <span v-show="!active"></span>
        <span :class="[$style.cross_L ,{[$style.active]: active}]"></span>
        <span :class="[$style.cross_R ,{[$style.active]: active}]"></span>
    </div>
</template>

<style module lang="postcss">
.hamburger_menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    position: relative;

    height: calc(var(--component-size) * 0.7);
    width: calc(var(--component-size) * 0.7);

    & span {
        margin: 0px;

        height: 2px;
        width: 100%;

        background-color: var(--default-text-color);

        border-radius: 1px;
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