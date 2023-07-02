<template>
    <div>
        <HeadBar />
        <TL />
    </div>
</template>

<script>
import Cookie from '@/components/js/Cookie.js';
import TL from "@/components/TL.vue";
import HeadBar from "@/components/HeadBar.vue";

export default {
  components: { 
      TL,
      HeadBar
  },
  setup() {
      if (navigator.cookieEnabled) {
            if (Cookie.read("hosts") == null){
                document.location = "/login";
            }
      } else {
          alert("Cookieを有効にしてください。")
      }
  },
  methods: {
  }
}
</script>

<style>
</style>