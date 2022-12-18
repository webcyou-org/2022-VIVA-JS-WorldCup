<script setup lang="ts">
const props = defineProps<{
    score: Number;
}>();
</script>
<template>
    <div class="gameHeaderView">
        <h1>2022 VIVA JS World Cup</h1>
        <p class="text score">score: {{ props.score }}</p>
    </div>
</template>

<style lang="scss" scoped>
h1 {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    text-shadow: 0 0 0.2em rgba(0, 0, 0, 1);
}
.text.score {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    text-align: center;
}
</style>
