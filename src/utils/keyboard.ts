import { KeyCode } from "../constant/key";

interface KeyProps {
    code: string;
    key: string;
}

export const isKey = ({ code, key }: KeyProps): boolean => {
    let isPressKey: boolean = false;

    if (key === "up") {
        if (code === KeyCode.UP || code === KeyCode.W) {
            isPressKey = true;
        }
    } else if (key === "right") {
        if (code === KeyCode.Right || code === KeyCode.D) {
            isPressKey = true;
        }
    } else if (key === "down") {
        if (code === KeyCode.Down || code === KeyCode.S) {
            isPressKey = true;
        }
    } else if (key === "left") {
        if (code === KeyCode.Left || code === KeyCode.A) {
            isPressKey = true;
        }
    } else if (key === "shoot") {
        if (code === KeyCode.X) {
            isPressKey = true;
        }
    }
    return isPressKey;
};
