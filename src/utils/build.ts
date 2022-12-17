import { Filed } from "../class/Filed";
import { Player } from "../class/Player";
import { Ball } from "../class/Ball";
import { Goal } from "../class/Goal";

export const initBuild = (innerWidth: number) => {
    const field = new Filed({
        x: 100,
        y: 0,
        width: 400,
        height: 400,
        maxX: innerWidth - 50,
    });
    const player = new Player({
        x: 600,
        y: field.centerY - 38,
        width: 24,
        height: 48,
        speed: 4,
    });
    const ball = new Ball({
        x: field.defaultX,
        y: field.centerY - 10,
        r: 20,
        width: 20,
        height: 20,
        speed: 4,
    });
    const goal = new Goal({ x: 20, y: 130, width: 80, height: 140 });

    return { field, player, ball, goal };
};
