<script setup lang="ts">
import HamburgerMenu from '../defaultComponents/HamburgerMenu.vue';

const mode: string = "MiAuth"

</script>

<template>
    <div class="head_bar">
        <HamburgerMenu /><p>{{ mode }}でログイン</p>
    </div>
</template>

<style scoped lang="postcss">
.head_bar {
    display: flex;
    align-items: center;

    width: 98%;

    font-size: 1.3em;

    padding: 0 1% 0 1%;
}
</style>