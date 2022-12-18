import { GamePadCode } from "../constant/key";
interface GameKeyProps {
    code: number;
    key: string;
}

const controllers: any = {};

export const connectHandler = (e: GamepadEvent) => {
    addGamePad(e.gamepad);
};

export const addGamePad = (gamepad: Gamepad) => {
    controllers[gamepad.index] = gamepad;
};

export const disConnectHandler = (e: GamepadEvent) => {
    delete controllers[e.gamepad.index];
};

export const gamePadUpdateStatus = (fn: Function) => {
    const haveEvents = "ongamepadconnected" in window;

    if (!haveEvents) {
        scanGamePads();
    }

    for (const j in controllers) {
        const controller: any = controllers[j];

        for (let i: number = 0; i < controller.buttons.length; i++) {
            let val = controller.buttons[i];
            let pressed = val == 1.0;

            if (typeof val == "object") {
                pressed = val.pressed;
                val = val.value;
            }

            fn({ pressed, num: i });
        }
    }
};

export const scanGamePads = () => {
    const gamepads: any = navigator.getGamepads
        ? navigator.getGamepads()
        : navigator.webkitGetGamepads
        ? navigator.webkitGetGamepads()
        : [];
    if (!gamepads) return;

    for (let i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) {
            if (gamepads[i].index in controllers) {
                controllers[gamepads[i].index] = gamepads[i];
            } else {
                addGamePad(gamepads[i]);
            }
        }
    }
};

export const isGameKey = ({ code, key }: GameKeyProps): boolean => {
    let isPressKey: boolean = false;

    if (key === "up" && code === GamePadCode.UP) {
        isPressKey = true;
    } else if (key === "right" && code === GamePadCode.Right) {
        isPressKey = true;
    } else if (key === "down" && code === GamePadCode.Down) {
        isPressKey = true;
    } else if (key === "left" && code === GamePadCode.Left) {
        isPressKey = true;
    } else if (key === "shoot" && code === GamePadCode.X) {
        isPressKey = true;
    }
    return isPressKey;
};
