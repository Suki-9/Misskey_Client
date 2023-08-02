<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    title?: string;
    button?: {
        enable?: boolean,
        title?: string
    }
}>();
defineEmits<{ (e: 'receive', text: string): string; }>();

let text = ref<string>('')
let active = ref<boolean>(false)

const reset = () => { text.value = '' }
</script>

<template>
    <form @submit="$emit('receive', text)">
        <div :class="$style.input" :style="((button == undefined) ? false : button.enable) ? 'width: 76%;' : 'width: 96%;'">
            <P :class="{ [$style.active]: text !== '' || active }">{{ title }}</P>
            <input 
                v-model="text"
                @focus="active = true" @blur="[active = false, !((button == undefined) ? false : button.enable) ? $emit('receive', text) : {}]"/>
            <i class="icon-cancel" @click="reset"></i>
        </div>
        <a
            @click="$emit('receive', text)"
            :class="$style.submit"
            v-text="(button == undefined) ? '' : button.title"
            v-show="(button == undefined) ? false : button.enable"
            >
        </a>
    </form>
</template>

<style module lang="postcss">
form {
    display: flex;
    flex-direction: row;
    align-items: center;

    width: 100%;

    font-size: 120%;

    border-radius: 7px;

    .input {
        position: relative;

        padding: 0 2% 0 2%;

        input {
            width: 90%;
            height: 1em;

            padding: 0 1% 1% 1%;

            font-size: 70%;
        }
        p,.active {
            position: absolute;
            
            animation-duration: 0.2s;
            animation-fill-mode: forwards;
        }
        p { animation-name: unfocus; font-size: 40%; left: 7px;}
        i { position: absolute; right: 0; width: auto; }
        .active { animation-name: focus; font-size: 60%; }
    }
    .submit {
        width: 20%;

        text-align: center;
        font-weight: 600;
        font-size: 70%;

        user-select: none;
    }
}
/* background color */
.submit,input,form {
    background-color: var(--true-button-color);
}
/* Animation */
@keyframes focus { 0% { font-size: 60%; } 100% { font-size: 40%; } }
@keyframes unfocus { 0% { font-size: 40%; } 100% { font-size: 60%; } }
</style>