<script setup lang="ts">
defineProps<{ listData: HamburgerMenuList }>();
defineEmits<{ (e: 'switch'): void }>();
</script>


<template>
    <div :class="$style.root">
        <a
            v-for="item in listData"
            :class="$style.active"
            @click="[$router.push(String(item.link)/*TODO: undefinedのときに/undefinedに遷移してしまう問題 */),$emit('switch')]"
            v-text="item.title"
        ></a>
    </div>
</template>


<style module lang="postcss">
.root {
    display: flex;
    flex-direction: column;

    font-size: 90%;
    a {
        border-bottom: solid 1px var(--primary-border-color);
    }
    .active {
        animation-name: fadein;
        animation-duration: 0.2s;
        animation-fill-mode: forwards;

        transform: translateX(-50px);
        opacity: 0;
    }
}
@keyframes fadein { 0% { opacity: 0; transform: translateX(-50px); }
                  100% { opacity: 1; transform: translateX(0px); } }
</style>