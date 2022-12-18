<script setup lang="ts">
const props = defineProps<{
    x: Number;
    y: Number;
    direction: Number;
}>();
</script>
<template>
    <div
        class="player"
        :class="'pos' + props.direction"
        :style="{ left: props.x + 'px', top: props.y + 'px' }"
    ></div>
</template>

<style lang="scss" scoped>
.player {
    position: absolute;
    width: 24px;
    height: 48px;
    background-image: url("../assets/player.png");
    background-size: 100%;
    z-index: 10;
    &.pos1 {
        background-position: 0 -48px;
    }
    &.pos2 {
        background-position: 0 -96px;
    }
    &.pos3 {
        background-position: 0 -288px;
    }
    &.pos4 {
        background-position: 0 0;
        z-index: 1;
    }
    &.pos6 {
        background-position: 0 -194px;
    }
    &.pos8 {
        background-position: 0 -146px;
    }
    &.pos9 {
        background-position: 0 -336px;
    }
    &.pos12 {
        background-position: 0 -240px;
    }
}
</style>
