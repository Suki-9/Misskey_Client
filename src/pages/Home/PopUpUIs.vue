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
    <NotificationView v-show="show.NotificationView" :class="$style.notices"/>
    <Post />
    <PopUpMenuList :Listcontent="PopUpMenuList_Listcontent"/>
</template>

<style module lang="scss">
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

@keyframes moveIn {
  0% {
    transform: translateY(-20%);
    opacity: 0;
  }
  70% {
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>