<script setup lang="ts">
const props = defineProps<{
    x: Number;
    y: Number;
    activeDirection: Number;
    direction: Number;
    frame: number;
}>();
</script>
<template>
    <div
        class="player"
        :class="[
            'pos' + props.direction,
            props.activeDirection > 0 ? 'frame' + frame : '',
        ]"
        :style="{ left: props.x + 'px', top: props.y + 'px' }"
    ></div>
</template>

<style lang="scss" scoped>
.player {
    position: absolute;
    width: 24px;
    height: 48px;
    background-image: url("../assets/player.png");
    background-size: 72px auto;
    z-index: 10;
    &.pos1 {
        background-position: 0 -48px;
        &.frame1 {
            background-position: 24px -48px;
        }
        &.frame2 {
            background-position: 48px -48px;
        }
    }
    &.pos2 {
        background-position: 0 -96px;
        &.frame1 {
            background-position: 24px -96px;
        }
        &.frame2 {
            background-position: 48px -96px;
        }
    }
    &.pos3 {
        background-position: 0 -288px;
        &.frame1 {
            background-position: 24px -288px;
        }
        &.frame2 {
            background-position: 48px -288px;
        }
    }
    &.pos4 {
        background-position: 0 0;
        z-index: 1;
        &.frame1 {
            background-position: 24px 0;
        }
        &.frame2 {
            background-position: 48px 0;
        }
    }
    &.pos6 {
        background-position: 0 -194px;
        &.frame1 {
            background-position: 24px -194px;
        }
        &.frame2 {
            background-position: 48px -194px;
        }
    }
    &.pos8 {
        background-position: 0 -146px;
        &.frame1 {
            background-position: 24px -146px;
        }
        &.frame2 {
            background-position: 48px -146px;
        }
    }
    &.pos9 {
        background-position: 0 -336px;
        &.frame1 {
            background-position: 24px -336px;
        }
        &.frame2 {
            background-position: 48px -336px;
        }
    }
    &.pos12 {
        background-position: 0 -240px;
        &.frame1 {
            background-position: 24px -240px;
        }
        &.frame2 {
            background-position: 48px -240px;
        }
    }
}
</style>
