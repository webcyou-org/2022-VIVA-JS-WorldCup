<script setup lang="ts">
import FieldView from "./components/TheField.vue";
import PlayerView from "./components/ThePlayer.vue";
import BallView from "./components/TheBall.vue";
import GoalView from "./components/TheGoal.vue";

import { ref, reactive, onMounted, onUnmounted } from "vue";
import { Direction } from "./enums/Direction";
import { initBuild } from "./utils/build";
import { isKey } from "./utils/keyboard";

const fps = 30;
const innerWidth = ref(window.innerWidth);

let buildObject = initBuild(innerWidth.value);
let state = reactive({
    score: 0,
    direction: 0x0000,
    field: buildObject.field,
    player: buildObject.player,
    balls: [buildObject.ball],
    goal: buildObject.goal,
});

const gameLoop = () => {
    update();
    draw();
};
const gameInterval = setInterval(gameLoop, 1000 / fps);

let update = () => {
    state.player.mainProcess();
    updateBalls();
    state.player.checkBallCollision(state.balls);
    // updateStatus();
};

let updateBalls = () => {
    for (let i = 0; i < state.balls.length; i++) {
        state.balls[i].mainProcess();
    }
};

let draw = () => {};

gameLoop();

onMounted(() => {
    window.addEventListener("keydown", (event) => {
        let code = event.code;

        if (isKey({ key: "up", code })) {
            state.direction |= Direction.UP;
        } else if (isKey({ key: "right", code })) {
            state.direction |= Direction.RIGHT;
        } else if (isKey({ key: "down", code })) {
            state.direction |= Direction.BOTTOM;
        } else if (isKey({ key: "left", code })) {
            state.direction |= Direction.LEFT;
        }
        state.player.direction = state.direction;

        if (isKey({ key: "shoot", code }) && !state.player.isDribble) {
            state.player.isShoot = true;
        }
    });

    window.addEventListener("keyup", (event) => {
        let code = event.code;

        if (isKey({ key: "up", code })) {
            state.direction &= ~Direction.UP;
        } else if (isKey({ key: "right", code })) {
            state.direction &= ~Direction.RIGHT;
        } else if (isKey({ key: "down", code })) {
            state.direction &= ~Direction.BOTTOM;
        } else if (isKey({ key: "left", code })) {
            state.direction &= ~Direction.LEFT;
        }
        state.player.direction = state.direction;

        if (isKey({ key: "shoot", code }) && !state.player.isDribble) {
            state.player.shoot();
        }
    });

    window.addEventListener("resize", () => {
        state.field.maxX = window.innerWidth - 50;
    });
});
</script>

<template>
    <div class="gameHeaderView"></div>
    <div class="gameMainView">
        <GoalView />
        <FieldView />
        <PlayerView
            :x="state.player.x"
            :y="state.player.y"
            :direction="state.player.lastDirection"
        />
        <BallView :x="state.balls[0].x" :y="state.balls[0].y" />
    </div>
</template>

<style lang="scss" scoped></style>
