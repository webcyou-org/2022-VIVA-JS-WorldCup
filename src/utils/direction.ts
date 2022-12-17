import { isKey } from "./keyboard";
import { isGameKey } from "./gamePad";
import { Direction } from "../enums/Direction";
interface DirectionProps {
    padType: string;
    type: string;
    code: any;
    state: any;
}

const isShootBool = (type: string, state: any) => {
    let isShoot: boolean = false;

    if (type === "keyboard") {
        isShoot = !state.player.isDribble;
    } else if (type === "gamePad") {
        isShoot = !state.player.isDribble && state.player.isShoot;
    }

    return isShoot;
};

export const changeDirection = ({
    padType,
    type,
    code,
    state,
}: DirectionProps) => {
    let keyControl: string = "";

    if (padType === "keyboard") {
        if (isKey({ key: "up", code })) {
            keyControl = "up";
        } else if (isKey({ key: "right", code })) {
            keyControl = "right";
        } else if (isKey({ key: "down", code })) {
            keyControl = "down";
        } else if (isKey({ key: "left", code })) {
            keyControl = "left";
        } else if (isKey({ key: "shoot", code })) {
            keyControl = "shoot";
        }
    } else if (padType === "gamePad") {
        if (isGameKey({ key: "up", code })) {
            keyControl = "up";
        } else if (isGameKey({ key: "right", code })) {
            keyControl = "right";
        } else if (isGameKey({ key: "down", code })) {
            keyControl = "down";
        } else if (isGameKey({ key: "left", code })) {
            keyControl = "left";
        } else if (isGameKey({ key: "shoot", code })) {
            keyControl = "shoot";
        }
    }

    if (type === "press") {
        switch (keyControl) {
            case "up":
                state.direction |= Direction.UP;
                break;
            case "right":
                state.direction |= Direction.RIGHT;
                break;
            case "down":
                state.direction |= Direction.BOTTOM;
                break;
            case "left":
                state.direction |= Direction.LEFT;
                break;
            case "shoot":
                if (padType === "gamePad") {
                    state.player.isShoot = true;
                } else if (isShootBool(padType, state)) {
                    state.player.isShoot = true;
                }
                break;
        }
    } else if (type === "release") {
        switch (keyControl) {
            case "up":
                state.direction &= ~Direction.UP;
                break;
            case "right":
                state.direction &= ~Direction.RIGHT;
                break;
            case "down":
                state.direction &= ~Direction.BOTTOM;
                break;
            case "left":
                state.direction &= ~Direction.LEFT;
                break;
            case "shoot":
                if (isShootBool(padType, state)) {
                    state.player.shoot();
                }
                break;
        }
    }
};
