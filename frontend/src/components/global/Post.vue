<script setup lang="ts">


const CreatePost = () => { 

}
</script>


<template>
    <i
        class="icon-pencil" 
        :class="$style.postButton"
        @click="CreatePost"></i>
</template>


<style module lang="postcss">
.postButton {
    position: absolute;
    bottom: 10%;
    right: 5%;

    border-radius: 7px;

    padding: 3%;

    font-size: 1.5em;
    line-height: 0;
    color: var(--primary-bg-color);

    background-color: var(--accent-color);
}
.postButton::before {
    margin: 0;
}
</style>