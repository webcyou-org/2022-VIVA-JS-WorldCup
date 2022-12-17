export enum KeyCode {
    UP = "ArrowUp",
    Right = "ArrowRight",
    Down = "ArrowDown",
    Left = "ArrowLeft",
    W = "KeyW",
    A = "KeyA",
    S = "KeyS",
    D = "KeyD",
    X = "KeyX",
}

export const isKey = {
    up: KeyCode.UP || KeyCode.W,
    right: KeyCode.Right || KeyCode.D,
    down: KeyCode.Down || KeyCode.S,
    left: KeyCode.Left || KeyCode.A,
    shoot: KeyCode.X,
};

export const isKeyAll = isKey.up || isKey.right || isKey.down || isKey.left;
