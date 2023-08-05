<template>
    <div :class="$style.root">
        <i class="icon-dot-3"></i>
        <i class="icon-home"></i>
        <i class="icon-bell-alt"></i>
        <i class="icon-cw"></i>
        <i class="icon-mail-alt"></i>
    </div>
</template>

<style module lang="postcss">
.root {
    display: flex;
    align-items: center;
    justify-content: space-around;

    position: absolute;
    bottom: 0;
    left: 0;

    width: 96vw;

    padding: 2%;

    border-top: solid 1px;

    background-color: var(--primary-bg-color);

    i {

        border-radius: 50%;

        padding: 3%;

        line-height: 0;

        border: solid 1px var( --accent-color);
    }
    i::before {
        margin: 0;
    }
}
</style>
