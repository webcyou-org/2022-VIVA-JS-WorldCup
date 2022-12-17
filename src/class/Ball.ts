import Filed from "./Filed";
import Goal from "./Goal";
import { Direction } from "../enums/Direction";

interface BallProps {
    x: number;
    y: number;
    r: number;
    width: number;
    height: number;
    speed: number;
}

export class Ball {
    private _direction: number = 0;

    public x: number;
    public y: number;
    public r: number;
    public width: number;
    public height: number;
    public speed: number;
    public frameCount: number = 7;
    public currentFrame: number = 1;
    public acceleration: number = 0;

    constructor({ x, y, r, width, height, speed }: BallProps) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    setDirection(state: number, acceleration: number): void {
        this._direction = state;
        this.acceleration = acceleration;
    }

    get direction(): number {
        return this._direction;
    }

    mainProcess(): void {
        if (this.direction) {
            this.moveProcess();
        }
    }

    moveProcess() {
        const field: Filed = Filed.getInstance();

        this.moveForwards();
        if (this.isGoal()) {
            field.resetBall(this);
            return;
        }
        if (this.isCollisions()) {
            field.resetBall(this);
            return;
        }
    }

    moveForwards() {
        if (this.acceleration < 1) {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.acceleration = 0;
            return;
        }

        switch (this.direction) {
            case Direction.RIGHT:
                this.x += this.speed * this.acceleration;
                break;
            case Direction.UP:
                this.y -= this.speed * this.acceleration;
                break;
            case Direction.LEFT:
                this.x -= this.speed * this.acceleration;
                break;
            case Direction.BOTTOM:
                this.y += this.speed * this.acceleration;
                break;
            case Direction.UP_RIGHT:
                this.y -= this.speed * this.acceleration;
                this.x += this.speed * this.acceleration;
                break;
            case Direction.BOTTOM_RIGHT:
                this.y += this.speed * this.acceleration;
                this.x += this.speed * this.acceleration;
                break;
            case Direction.BOTTOM_LEFT:
                this.y += this.speed * this.acceleration;
                this.x -= this.speed * this.acceleration;
                break;
            case Direction.UP_LEFT:
                this.y -= this.speed * this.acceleration;
                this.x -= this.speed * this.acceleration;
                break;
        }
        this.acceleration = this.acceleration * 0.75;
    }

    isCollisions(): boolean {
        const field: Filed = Filed.getInstance();

        let isCollided: boolean = false;
        if (
            field.x > this.x + this.width ||
            field.y > this.getMapY() ||
            field.mapYBottomSide < this.getMapY() ||
            field.maxX < this.x
        ) {
            isCollided = true;
        }
        return isCollided;
    }

    isGoal(): boolean {
        const field: Filed = Filed.getInstance();
        const goal: Goal = Goal.getInstance();

        let isGoal = false;
        if (
            field.x > this.x + this.width &&
            field.y + goal.y < this.y + this.height &&
            field.y + goal.y + goal.height > this.y + this.height
        ) {
            isGoal = true;
        }
        return isGoal;
    }

    getMapX() {
        return Math.round(this.x + this.width / 2);
    }

    getMapY() {
        return Math.round(this.y + this.height / 2);
    }
}

export default Ball;
