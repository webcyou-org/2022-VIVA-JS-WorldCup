<template>
    <div class="box fieldView">
        <div class="field">
            <p class="pic goalMark"></p>
            <p class="pic flag top"></p>
            <p class="pic centerCircle"></p>
            <p class="pic flag bottom"></p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.fieldView {
    position: relative;
    margin: 0 200px 0 100px;
    &::before {
        position: absolute;
        content: "";
        right: -200px;
        display: block;
        border-top: #fff 4px solid;
        border-bottom: #fff 4px solid;
        width: 200px;
        height: 100%;
        box-sizing: border-box;
    }
}
.field {
    position: relative;
    width: 100%;
    min-width: 450px;
    height: 400px;
    border: #fff 4px solid;
    box-sizing: border-box;
    &::before,
    &::after {
        position: absolute;
        content: "";
        display: block;
        box-sizing: border-box;
    }
    &::before {
        top: 50%;
        margin-top: -125px;
        width: 150px;
        height: 250px;
        border: #fff 4px solid;
        border-left: none;
    }
    &::after {
        top: 50%;
        margin-top: -75px;
        width: 80px;
        height: 150px;
        border: #fff 4px solid;
        border-left: none;
    }
}
.pic.goalMark {
    position: absolute;
    top: 50%;
    left: 148px;
    width: 50px;
    height: 100px;
    margin-top: -50px;
    border: #fff 4px solid;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    border-left: none;
}

.pic {
    &.centerCircle {
        position: absolute;
        top: 50%;
        right: -75px;
        margin-top: -75px;
        width: 150px;
        height: 150px;
        border: #fff 4px solid;
        border-radius: 100%;
        box-sizing: border-box;
    }
    &.flag {
        position: absolute;
        left: -9px;
        width: 1px;
        height: 20px;
        border-right: 4px solid #000;
        &::before {
            position: absolute;
            content: "";
            display: block;
            top: 0px;
            left: -15px;
            border-top: 2px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 16px solid #ff8d7d;
        }
        &.top {
            top: -24px;
        }
        &.bottom {
            bottom: -4px;
        }
    }
}
</style>
