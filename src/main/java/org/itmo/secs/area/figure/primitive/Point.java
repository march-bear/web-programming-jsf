package org.itmo.secs.area.figure.primitive;

import jakarta.validation.constraints.PositiveOrZero;

public class Point {
    @PositiveOrZero
    private Double x;
    @PositiveOrZero
    private Double y;

    public Point(Double x, Double y) {
        this.x = x;
        this.y = y;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }
}
