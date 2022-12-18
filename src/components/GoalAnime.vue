<script setup lang="ts">
const props = defineProps<{
    isShow: boolean;
}>();
</script>
<template>
    <p v-if="isShow" class="pic goal">GOAL!!!!</p>
</template>

<style lang="scss" scoped>
.pic.goal {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -43px;
    margin-left: -180px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 86px;
    color: #ff2121;
    text-shadow: 0 0 0.05em #fff, 0 0 0.1em #fff, 0 0 0.15em #fff,
        0 0 0.3em #fff;
    z-index: 10;
    animation: goalAnime 2.5s ease-out 1;
}
@keyframes goalAnime {
    0% {
        transform: translate3d(-100px, 0, 0) scale(0.8);
        opacity: 0.5;
    }
    10% {
        transform: translate3d(0, 0, 0) scale(1);
        opacity: 1;
    }
    90% {
        transform: translate3d(80px, 0, 0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate3d(80px, 0, 0) scale(1.08);
        opacity: 0;
    }
}
</style>
