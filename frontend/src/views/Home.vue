<template>
    <div>
        <v-app-bar
            density="compact"
            :elevation="1">
            <v-tabs
            v-model="tab"
            fixed-tabs
            >
                <v-tab
                    v-for="TLattr in TLattrs"
                    :key="TLattr"
                >
                    {{ TLattr }}
                </v-tab>
            </v-tabs>
        </v-app-bar>
        <v-window
            v-model="tab"
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
//import HomeUI from "@/components/vue/home/HomeUI.vue";

export default {
    components: { 
        TL,
    },
    data: () => ({
        tab: null,
        isLoading:true,
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
    },
}
</script>

<style>

</style>