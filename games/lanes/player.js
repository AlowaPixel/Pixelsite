class Player extends Actor {
    constructor(x, size) {
        super(x, laneToY(round(LANE_COUNT * 0.5)), size, color(0, 255, 60));
    }

    setLane(lane) {
        this.targetY = laneToY(lane);
    }

    getLane() {
        return yToLane(this.targetY);
    }
}