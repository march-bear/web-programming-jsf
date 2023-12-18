package org.itmo.secs.area.figure;

import com.org.itmo.lab2web.area.figure.primitive.Quarter;
import jakarta.validation.constraints.Positive;

public class Circle extends Figure {
    private final Double radius;
    public Circle(@Positive Double radius) {
        this.radius = radius;
    }

    @Override
    public boolean checkHit(Point point, Double radius, Quarter q) {
        return Math.pow(point.getX(), 2.) + Math.pow(point.getY(), 2.) <= Math.pow(radius * this.radius, 2.);
    }
}
