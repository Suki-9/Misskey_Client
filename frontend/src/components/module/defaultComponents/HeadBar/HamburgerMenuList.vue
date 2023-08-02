<script setup lang="ts">
import { ListItem } from '../../ts/types/headbar';

defineProps<{
    active: boolean,
    selectItemId: number,
    listItems: ListItem[];
}>()
</script>

<template>
    <div :class="$style.list" v-show="active">
        <p  
            v-for="listItem in listItems"
            :key="listItem.id"
        >{{ listItem.title }}</p>
    </div>
</template>

<style module lang="postcss">
.list {
    margin-left: var(--component-size);

    p {
        font-size:1.2em ;
    }
}
</style>