<script setup lang="ts">
const props = defineProps<{
    power: Number;
}>();
</script>
<template>
    <div class="gameFooterView">
        <div class="box nav">
            <p class="text">↑ : ArrowUp orKeyW</p>
            <p class="text">→ : ArrowRight orKeyD</p>
            <p class="text">↓ : ArrowDown orKeyS</p>
            <p class="text">← : ArrowLeft orKeyA</p>
            <p class="text">shoot : KeyX</p>
        </div>
        <div class="box controller">
            <div class="box cursor">
                <ul class="list cursorList">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div class="box button">
                <ul class="list buttonList">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
        <div class="box shoot">
            <p class="text shoot">Power</p>
            <ul class="list shootPowerList">
                <li
                    :class="{ active: power >= index }"
                    v-for="index in 5"
                    :key="index"
                ></li>
            </ul>
            <p v-if="power == 5" class="text maxPower">MAX!!!</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.box.nav {
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    & > .text {
        margin-bottom: 4px;
    }
}
.gameFooterView {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 20px;
}

.box.controller {
    position: relative;
    width: 228px;
    height: 100px;
    padding-top: 6px;
    border: #000 4px solid;
    border-radius: 20px;
    background: #fff;
    .box.cursor,
    .box.button {
        position: absolute;
        width: 80px;
        height: 80px;
        border: #000 4px solid;
        border-radius: 40px;
        background: #fff;
    }
    .box.cursor {
        left: 6px;
    }
    .box.button {
        right: 6px;
    }
    .list.cursorList {
        position: absolute;
        left: 27px;
        top: 12px;
        & > li {
            position: absolute;
            display: block;
            width: 19px;
            height: 18px;
            border: #000 4px solid;
            border-radius: 4px;
            &:nth-child(1) {
                left: 0;
                border-bottom: none;
            }
            &:nth-child(2) {
                left: 0;
                top: 28px;
                border-top: none;
            }
            &:nth-child(3) {
                top: 14px;
                left: 15px;
                border-left: none;
            }
            &:nth-child(4) {
                top: 14px;
                left: -15px;
                border-right: none;
            }
        }
    }
    .list.buttonList {
        position: absolute;
        top: 9px;
        left: 27px;
        & > li {
            position: absolute;
            display: block;
            width: 20px;
            height: 20px;
            border: #000 4px solid;
            border-radius: 10px;
            &:nth-child(1) {
                left: 0;
            }
            &:nth-child(2) {
                left: 0;
                top: 33px;
            }
            &:nth-child(3) {
                top: 16px;
                left: 17px;
            }
            &:nth-child(4) {
                top: 16px;
                left: -17px;
            }
        }
    }
}
.box.shoot {
    position: relative;
    display: flex;
    align-items: flex-end;
}
.text.shoot {
    margin-right: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    line-height: 1;
}
.box.controller {
    margin: 0 50px;
}
.list.shootPowerList {
    display: flex;
    justify-content: start;
    align-items: flex-end;
    list-style: none;
    padding: 0;
    & > li {
        width: 10px;
        height: 30px;
        margin: 0 1px;
        border: rgba(255, 255, 255, 0.5) 1px solid;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.5);
        &:nth-child(1) {
            height: 6px;
        }
        &:nth-child(2) {
            height: 12px;
        }
        &:nth-child(3) {
            height: 18px;
        }
        &:nth-child(4) {
            height: 24px;
        }
        &.active {
            background: rgb(18, 204, 246);
        }
    }
}
.text.maxPower {
    position: absolute;
    right: -95px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 24px;
    color: #ff2121;
    text-shadow: 0 0 0.05em #fff, 0 0 0.1em #fff, 0 0 0.15em #fff,
        0 0 0.3em #fff;
    animation: maxPowerAnime 1s ease-in-out infinite;
}
@keyframes maxPowerAnime {
    0% {
        transform: scale(1);
        opacity: 0.8;
    }
    50% {
        transform: scale(1.3);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 0.8;
    }
}
</style>
