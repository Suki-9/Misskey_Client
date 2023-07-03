<template>
    <div>
        <v-tabs
            v-model="tab"
            color="basil"
            grow
        >
            <v-tab
                v-for="TLattr in TLattrs"
                :key="TLattr"
            >
                {{ TLattr }}
            </v-tab>
        </v-tabs>
        <v-window
            v-model="tab"
            show-arrows="hover"
            direction="vertical"
        >
            <v-window-item
                v-for="TLattr in TLattrs"
                :key="TLattr"
            >
                <TL :attr=TLattr />
            </v-window-item>
        </v-window>
    </div>
</template>

<script>
import Cookie from '@/components/js/Cookie.js';
import TL from "@/components/vue/home/TL.vue";
import HomeUI from "@/components/vue/home/HomeUI.vue";

export default {
    components: { 
        TL,
        HomeUI
    },
    data: () => ({
        tab: null,
        TLattrs: [
            "home",
            "local",
            "hybrid",
            "global",
        ],
    }),
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