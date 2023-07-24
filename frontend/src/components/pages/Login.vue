<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();

//TODO:3 これstringにしたら怒られる
//MEMO: nameを取得して現在どのモードなのかを取得
const LoginMode = String(route.name)

//わざわざ関数作ってるけど必要ない消せ
function modeSwitch() {
    console.log(LoginMode)
}

</script>

<template>
    <div class="m-appBar h4" @click="modeSwitch">
        <p>{{ LoginMode }}でログイン</p>
    </div>
    <router-view />
</template>