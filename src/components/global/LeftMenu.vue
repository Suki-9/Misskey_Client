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
    max-width: 80%;

    background-color: var(--primary-bg-color);
    .bio {
    }
    .list {
    }
}

</style>