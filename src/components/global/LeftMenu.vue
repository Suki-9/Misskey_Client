<script setup lang="ts">

</script>


<template>
    <div :class="$style.root">
        <div :class="$style.bio">

        </div>
        <div :class="$style.list">
            <a>プロフィール</a>
            <a>お気に入り</a>
            <a>リスト</a>
            <a>ドライブ</a>
        </div>
        <div :class="$style.list">
            <a>設定</a>
            <a>もっと</a>
            <a>リアクションデッキ</a>
        </div>
    </div>
</template>


<style module lang="scss">
.root {
    display: flex;
    flex-direction: column;

    max-width: 80%;

    padding: 2%;

    font-size: 80%;

    background-color: var(--secondary-bg-color);
    .bio {
    }
    .list {
        display: flex;
        flex-direction: column;

        border-bottom: solid 1px var(--primary-border-color);
    }
}

</style>