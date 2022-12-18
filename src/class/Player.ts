import type Ball from "./Ball";
import Filed from "./Filed";
import { Direction } from "../enums/Direction";

interface PlayerProps {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
}

export class Player {
    private _direction: number = 0;

    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public speed: number = 0;
    public power: number = 1;
    public lastDirection: number = 0;
    public directionCommand: number[] = [];
    public frameCount: number = 7;
    public currentFrame: number = 1;
    public isShoot: boolean = false;
    public isDash: boolean = false;
    public isDribble: boolean = false;
    public isBallKeep: boolean = false;
    public ball: null | Ball = null;

    constructor({ x, y, width, height, speed }: PlayerProps) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    set direction(state: number) {
        this._direction = state;
        if (state != 0) {
            this.lastDirection = state;
        }
    }

    get direction() {
        return this._direction;
    }

    mainProcess() {
        if (this.isShoot) {
            this.power++;
            return;
        }

        if (this.isBallKeep && this.isDribble) {
            this.dribbleMove(this.directionCommand[0]);
        } else if (this.isBallKeep) {
            this.keepProcess();
        } else {
            this.moveProcess();
        }

        if (this.direction && !this.isDribble) {
            this.setDirectionCommand();
        }
    }

    moveProcess() {
        if (this.direction) {
            this.moveForwards(this.direction);
        }
        if (this.checkCollisions()) {
            this.moveBackwards();
            return;
        }
    }

    keepProcess() {
        if (this.direction) {
            if (this.isDribbleCommand()) {
                this.kickTheBall();
                this.isDribble = true;
            } else {
                this.changeKeepBallPosition();
            }
        }
    }

    shoot() {
        const direction =
            this.directionCommand.length > 0
                ? this.directionCommand[0]
                : this.lastDirection;

        if (this.isBallKeep) {
            this.ball?.setDirection(direction, this.speed * this.shootPower);
            this.ballRelease();
        }

        this.isShoot = false;
        this.power = 1;
    }

    get shootPower(): number {
        return Math.ceil(this.power / 10) > 5 ? 5 : Math.ceil(this.power / 10);
    }

    isDribbleCommand(): boolean {
        if (this.directionCommand.length < 6) return false;

        const dribbleCommand = this.directionCommand.slice(0, 5);
        let isDribbleCommand: boolean = true;

        for (let i = 0; i < dribbleCommand.length; i++) {
            if (dribbleCommand[0] !== dribbleCommand[i]) {
                isDribbleCommand = false;
                break;
            }
        }
        return isDribbleCommand;
    }

    changeKeepBallPosition() {
        const ball = this.ball;
        if (!ball) return;

        switch (this.direction) {
            case Direction.RIGHT:
                ball.x = this.x + this.width;
                ball.y = this.y + this.height - ball.height;
                break;
            case Direction.UP:
                ball.x = this.x + (this.width - ball.width) / 2;
                ball.y = this.y;
                break;
            case Direction.LEFT:
                ball.x = this.x - this.width;
                ball.y = this.y + this.height - ball.height;
                break;
            case Direction.BOTTOM:
                ball.x = this.x + (this.width - ball.width) / 2;
                ball.y = this.y + this.height;
                break;
            case Direction.UP_RIGHT:
                ball.x = this.x + this.width;
                ball.y = this.y + this.height / 2;
                break;
            case Direction.UP_LEFT:
                ball.x = this.x - this.width;
                ball.y = this.y + this.height / 2;
                break;
            case Direction.BOTTOM_RIGHT:
                ball.x = this.x + this.width;
                ball.y = this.y + this.height - ball.height / 2;
                break;
            case Direction.BOTTOM_LEFT:
                ball.x = this.x - this.width;
                ball.y = this.y + this.height - ball.height / 2;
                break;
        }
    }

    setDirectionCommand() {
        this.directionCommand.unshift(this.direction);

        if (this.directionCommand.length > 10) {
            this.directionCommand.pop();
        }
    }

    moveBackwards() {
        switch (this.direction) {
            case Direction.RIGHT:
                this.x -= this.speed;
                break;
            case Direction.UP:
                this.y += this.speed;
                break;
            case Direction.LEFT:
                this.x += this.speed;
                break;
            case Direction.BOTTOM:
                this.y -= this.speed;
                break;
            case Direction.UP_RIGHT:
                this.y += this.speed;
                this.x -= this.speed;
                break;
            case Direction.BOTTOM_RIGHT:
                this.y -= this.speed;
                this.x -= this.speed;
                break;
            case Direction.BOTTOM_LEFT:
                this.y -= this.speed;
                this.x += this.speed;
                break;
            case Direction.UP_LEFT:
                this.y += this.speed;
                this.x += this.speed;
                break;
        }
    }

    moveForwards(direction: number) {
        switch (direction) {
            case Direction.RIGHT:
                this.x += this.speed;
                break;
            case Direction.UP:
                this.y -= this.speed;
                break;
            case Direction.LEFT:
                this.x -= this.speed;
                break;
            case Direction.BOTTOM:
                this.y += this.speed;
                break;
            case Direction.UP_RIGHT:
                this.y -= this.speed;
                this.x += this.speed;
                break;
            case Direction.BOTTOM_RIGHT:
                this.y += this.speed;
                this.x += this.speed;
                break;
            case Direction.BOTTOM_LEFT:
                this.y += this.speed;
                this.x -= this.speed;
                break;
            case Direction.UP_LEFT:
                this.y -= this.speed;
                this.x -= this.speed;
                break;
        }
    }

    dribbleMove(direction: number) {
        if (this.ball?.acceleration == 0) {
            const distance = Math.round(
                this.getDistance(this.ball.mapX, this.ball.mapY)
            );

            if (distance > this.getDistanceLine(direction)) {
                this.moveForwards(direction);
            } else {
                this.isDribble = false;
                this.directionCommand = [];
            }

            if (distance > 120) {
                this.ballRelease();
            }
        }
    }

    ballRelease() {
        this.isDribble = false;
        this.isBallKeep = false;
        this.ball = null;
        this.directionCommand = [];
    }

    getDistance(x: number, y: number): number {
        return Math.sqrt(
            Math.pow(x - this.footX, 2) + Math.pow(y - this.footY, 2)
        );
    }

    getDistanceLine(direction: number) {
        let distance = 0;
        switch (direction) {
            case Direction.RIGHT:
                distance = 30;
                break;
            case Direction.LEFT:
                distance = 30;
                break;
            case Direction.UP:
                distance = 30;
                break;
            case Direction.BOTTOM:
                distance = 14;
                break;
            case Direction.UP_RIGHT:
                distance = 34;
                break;
            case Direction.UP_LEFT:
                distance = 34;
                break;
            case Direction.BOTTOM_RIGHT:
                distance = 30;
                break;
            case Direction.BOTTOM_LEFT:
                distance = 30;
                break;
        }
        return distance;
    }

    checkCollisions(): boolean {
        const field: Filed = Filed.getInstance();

        let isCollided = false;
        if (
            field.x > this.x ||
            field.y > this.footY ||
            field.mapYBottomSide < this.footY ||
            field.maxX < this.x
        ) {
            isCollided = true;
        }
        return isCollided;
    }

    checkBallCollision(balls: Ball[]) {
        if (this.isBallKeep) return;

        for (let i = 0; i < balls.length; i++) {
            const ball: Ball = balls[i];
            const dx = ball.x - this.x;
            const dy = ball.y - this.y - this.height / 2;

            if (dx * dx + dy * dy < ball.r * ball.r) {
                this.ball = ball;
                this.isBallKeep = true;
                this.directionCommand = [];
            }
        }
    }

    kickTheBall(): void {
        if (!this.ball) return;
        this.ball.setDirection(this.direction, this.speed);
    }

    get footX() {
        return Math.round(this.x + this.width / 2);
    }

    get footY() {
        return Math.round(this.y + this.height);
    }
}
