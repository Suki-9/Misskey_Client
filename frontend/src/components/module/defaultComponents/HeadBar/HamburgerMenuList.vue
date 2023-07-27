<script setup lang="ts">
import { ListItem } from './types';

defineProps<{
    listItems: ListItem[];
}>()
</script>

<template>
    <div>
        <p
            v-for="listItem in listItems"
            :key="listItem.id"
        >{{ listItem.title }}</p>
    </div>
</template>

<style lang="postcss">

</style>