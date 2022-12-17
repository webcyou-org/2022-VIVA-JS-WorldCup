<template>
    <div class="pic goal"></div>
</template>
<style lang="scss" scoped>
.pic.goal {
    position: absolute;
    top: 130px;
    left: 20px;
    width: 80px;
    height: 140px;
    background: repeating-linear-gradient(
            -45deg,
            #333,
            #333 2px,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0) 8px
        ),
        repeating-linear-gradient(
            45deg,
            #333,
            #333 2px,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0) 8px
        );
    border: 3px #fff solid;
    border-right: none;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    box-sizing: border-box;
}
</style>
