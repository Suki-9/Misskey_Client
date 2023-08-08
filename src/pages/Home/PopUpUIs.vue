<script setup lang="ts">
//TS Module
import { ref } from "vue";

//vue Component
import PopUpMenuList from "../../components/global/PopUpMenuList.vue"




</script>

<script lang="ts">
const PopUpMenuList_Listcontent = ref()


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
</template>