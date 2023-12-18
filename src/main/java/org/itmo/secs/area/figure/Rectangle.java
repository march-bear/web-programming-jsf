package org.itmo.secs.area.figure;

import jakarta.validation.constraints.Positive;
import org.itmo.secs.area.figure.primitive.Quarter;
import org.itmo.secs.area.figure.primitive.Point;

public class Rectangle extends Figure {
    @Positive
    private final Double width;
    @Positive
    private final Double height;

    public Rectangle(Double width, Double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public boolean checkHit(Point point, Double radius, Quarter q) {
        return point.getX() <= width * radius && point.getY() <= height * radius;
    }
}
