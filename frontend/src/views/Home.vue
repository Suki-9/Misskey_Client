<template>
  <TL class="TL" />
</template>

<script>
import Cookie from '@/components/js/Cookie.js';
import TL from "@/components/TL.vue";

export default {
  components: { 
      TL
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
.TL {
    background-color: rgb(220, 220, 220);
}
</style>