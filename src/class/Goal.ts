interface GoalProps {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Goal {
    private static _instance: Goal | null = null;

    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor({ x, y, width, height }: GoalProps) {
        if (Goal._instance) {
            throw new Error("must use the getInstance.");
        }

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        Goal._instance = this;
    }

    public static getInstance(): Goal {
        if (Goal._instance === null) {
            Goal._instance = new Goal({
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            });
        }
        return Goal._instance;
    }
}

export default Goal;
