<script setup lang="ts">
import FieldView from "./components/TheField.vue";
// @ts-ignore
import PlayerView from "./components/ThePlayer.vue";
// @ts-ignore
import BallView from "./components/TheBall.vue";
import GoalView from "./components/TheGoal.vue";
// @ts-ignore
import GameHeader from "./components/GameHeader.vue";
// @ts-ignore
import GameFooter from "./components/GameFooter.vue";
// @ts-ignore
import GoalAnime from "./components/GoalAnime.vue";

import { ref, reactive, onMounted, onUnmounted } from "vue";
import { initBuild } from "./utils/build";
import {
    gamePadUpdateStatus,
    disConnectHandler,
    connectHandler,
} from "./utils/gamePad";
import { changeDirection } from "./utils/direction";

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
    isGoalAnime: false,
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

    gamePadUpdateStatus((callback: any) => {
        if (callback.pressed) {
            changeDirection({
                padType: "gamePad",
                type: "press",
                code: callback.num,
                state,
            });
        } else {
            changeDirection({
                padType: "gamePad",
                type: "release",
                code: callback.num,
                state,
            });
        }
    });
    state.player.direction = state.direction;
};

let updateBalls = () => {
    for (let i = 0; i < state.balls.length; i++) {
        state.balls[i].mainProcess();
        state.balls[i].addGoalCallBack(() => {
            state.score++;
            state.isGoalAnime = true;
        });
    }
};

let draw = () => {};

gameLoop();

onMounted(() => {
    window.addEventListener("keydown", (event) => {
        changeDirection({
            padType: "keyboard",
            type: "press",
            code: event.code,
            state,
        });
    });

    window.addEventListener("keyup", (event) => {
        changeDirection({
            padType: "keyboard",
            type: "release",
            code: event.code,
            state,
        });
    });

    window.addEventListener("resize", () => {
        state.field.maxX = window.innerWidth - 50;
    });

    window.addEventListener("animationend", (event) => {
        if (state.isGoalAnime) state.isGoalAnime = false;
    });

    window.addEventListener("gamepadconnected", connectHandler);
    window.addEventListener("gamepaddisconnected", disConnectHandler);
});
</script>

<template>
    <GameHeader :score="state.score" />
    <div class="gameMainView">
        <GoalView />
        <FieldView />
        <PlayerView
            :x="state.player.x"
            :y="state.player.y"
            :direction="state.player.lastDirection"
        />
        <BallView
            :x="state.balls[0].x"
            :y="state.balls[0].y"
            :frame="state.balls[0].currentFrame"
        />
        <GoalAnime :isShow="state.isGoalAnime" />
    </div>
    <GameFooter
        :power="state.player.shootPower"
        :direction="state.direction"
        :isShoot="state.player.isShoot"
    />
</template>
