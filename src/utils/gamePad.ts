const controllers: any = {};

export const connectHandler = (e) => {
    addGamePad(e.gamepad);
};

export const addGamePad = (gamepad: Gamepad) => {
    controllers[gamepad.index] = gamepad;
};

export const disConnectHandler = (e) => {
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
