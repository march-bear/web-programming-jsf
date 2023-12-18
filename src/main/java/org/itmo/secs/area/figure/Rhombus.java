package org.itmo.secs.area.figure;

import jakarta.validation.constraints.NegativeOrZero;
import jakarta.validation.constraints.PositiveOrZero;
import org.itmo.secs.area.figure.primitive.Quarter;
import org.itmo.secs.area.figure.primitive.Point;

public class Rhombus extends Figure {
    @PositiveOrZero
    private final Double yO;
    @NegativeOrZero
    private final Double k;

    public Rhombus(Double xO, Double yO) {
        this.yO = yO;
        this.k = - yO / xO;
    }

    @Override
    public boolean checkHit(Point point, Double radius, Quarter q) {
        return (Double.isInfinite(k))
                ? (point.getX() == 0 && point.getY() <= yO * radius)
                : point.getY() <= k * point.getX() + yO * radius;
    }
}
