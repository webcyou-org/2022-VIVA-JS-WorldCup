<script setup lang="ts">
const pos = defineProps<{
    x: Number;
    y: Number;
}>();
</script>
<template>
    <div class="ball" :style="{ left: pos.x + 'px', top: pos.y + 'px' }"></div>
</template>

<style lang="scss" scoped>
.ball {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: #000 1px solid;
    box-sizing: border-box;
    background: url("../assets/ball.png");
    background-size: 20px;
    box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.7);
}
</style>
