<template>
    <v-bottom-navigation
        :elevation="5"
        grow
    >
        <v-btn>
            <i class="icon-menu icon-f"></i>
        </v-btn>
        <v-btn>
            <i class="icon-home icon-f"></i>
        </v-btn>
        <v-btn>
            <i class="icon-bell-alt icon-f"></i>  
        </v-btn>
        <v-btn @click="reload">
            <i class="icon-spin3 icon-f"></i>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
    methods: {
        reload() {
            location.reload();
        },
    }
}
</script>

<style>
.icon-f {
    font-size: 1.5em;
}
</style>