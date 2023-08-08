<script setup lang="ts">
//TS Module
import { ref } from "vue";

//vue Component
import PopUpMenuList from "../../components/global/PopUpMenuList.vue"
import Post from "../../components/global/Post.vue";
import NotificationView from "../../components/global/NotificationView.vue";


</script>

<script lang="ts">
const PopUpMenuList_Listcontent = ref()
const show = ref<Record<string, boolean>>({
    NotificationView: false,
})

export const Show_NotificationView = () => { 
    show.value.NotificationView = !show.value.NotificationView
    console.log(show.value.NotificationView)
}

export const popUpMenuList = (
    Listcontent?: {
        text: string,
        action: string,
    }[]
) => {
    PopUpMenuList_Listcontent.value = Listcontent
}
</script>


<template>
    <PopUpMenuList :Listcontent="PopUpMenuList_Listcontent"/>
    <Post />
    <NotificationView v-show="show.NotificationView" :class="$style.notices"/>
</template>

<style module lang="scss">
@import "../../assets/css/animation.css";
.notices {
  position: fixed;
  top: 2%;

  height: 90vh;

  animation-name: moveIn;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;

  transform: translateY(-100%);
  opacity: 0;
}
</style>