import type Ball from "./Ball";

interface FiledProps {
    x: number;
    y: number;
    width: number;
    height: number;
    maxX: number;
}

export class Filed {
    private static _instance: Filed | null = null;
    private _maxX: number = 0;

    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor({ x, y, width, height, maxX }: FiledProps) {
        if (Filed._instance) {
            throw new Error("must use the getInstance.");
        }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this._maxX = maxX;

        Filed._instance = this;
    }

    public static getInstance(): Filed {
        if (Filed._instance === null) {
            Filed._instance = new Filed({
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                maxX: 0,
            });
        }
        return Filed._instance;
    }

    set maxX(x: number) {
        this._maxX = x;
    }

    get maxX(): number {
        return this._maxX;
    }

    get mapYBottomSide(): number {
        return this.y + this.height;
    }

    get centerY(): number {
        return this.y + this.height / 2;
    }

    get defaultX(): number {
        return this.x + this.width;
    }

    resetBall(ball: Ball): void {
        ball.acceleration = 0;
        ball.x = this.defaultX;
        ball.y = this.centerY - ball.height / 2;
    }
}

export default Filed;
