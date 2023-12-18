package org.itmo.secs.area.figure;

import com.org.itmo.lab2web.area.figure.primitive.Quarter;
import jakarta.validation.constraints.Positive;

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
