<script setup lang="ts">
import FieldView from "./components/TheField.vue";
import PlayerView from "./components/ThePlayer.vue";
import BallView from "./components/TheBall.vue";
import GoalView from "./components/TheGoal.vue";

import { ref, reactive, onMounted, onUnmounted } from "vue";
import { isKey } from "./constant/key";
import { Direction } from "./enums/Direction";
import { initBuild } from "./utils/build";
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
        switch (code) {
            case isKey.up:
                state.direction |= Direction.UP;
                break;
            case isKey.right:
                state.direction |= Direction.RIGHT;
                break;
            case isKey.down:
                state.direction |= Direction.BOTTOM;
                break;
            case isKey.left:
                state.direction |= Direction.LEFT;
                break;
        }

        state.player.direction = state.direction;

        if (code === isKey.shoot && !state.player.isDribble) {
            state.player.isShoot = true;
        }
    });

    window.addEventListener("keyup", (event) => {
        let code = event.code;
        switch (code) {
            case isKey.up:
                state.direction &= ~Direction.UP;
                break;
            case isKey.right:
                state.direction &= ~Direction.RIGHT;
                break;
            case isKey.down:
                state.direction &= ~Direction.BOTTOM;
                break;
            case isKey.left:
                state.direction &= ~Direction.LEFT;
                break;
        }
        state.player.direction = state.direction;

        if (code === isKey.shoot && !state.player.isDribble) {
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
