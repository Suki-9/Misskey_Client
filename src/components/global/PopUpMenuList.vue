<script setup lang="ts">
defineProps<{
    Listcontent: {
        text: string,
        action: string,
    }[]
}>();
</script>



<template>
    <p v-for="item in Listcontent">
        {{ item.text }}
    </p>
</template>

