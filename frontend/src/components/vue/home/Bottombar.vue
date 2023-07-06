<template>
    <v-bottom-navigation
        :elevation="0"
        grow
    >
        <v-btn class="mx-3">
            <i class="icon-menu icon-f"></i>
        </v-btn>
        <v-btn class="mx-3">
            <i class="icon-home icon-f"></i>
        </v-btn>
        <v-btn class="mx-3">
            <i class="icon-bell-alt icon-f"></i>  
        </v-btn>
        <v-btn class="mx-3">
            <i class="icon-spin3 icon-f"></i>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {

}
</script>

<style>
.icon-f {
    font-size: 1.5em;
}
</style>