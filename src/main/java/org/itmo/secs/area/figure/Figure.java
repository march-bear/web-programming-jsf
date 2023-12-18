package org.itmo.secs.area.figure;

import jakarta.validation.constraints.Positive;
import org.itmo.secs.area.figure.primitive.Quarter;
import org.itmo.secs.area.figure.primitive.Point;

public abstract class Figure {
    public abstract boolean checkHit(Point point, @Positive Double radius, Quarter q);
    public boolean checkHit(Point point, @Positive Double radius) {
        return checkHit(point, radius, Quarter.FIRST);
    }

    public boolean checkHit(Double x, Double y, @Positive Double radius) {
        var res = false;
        var point = new Point(Math.abs(x), Math.abs(y));
        if (x >= 0 && y >= 0) {
           res = checkHit(point, radius, Quarter.FIRST);
        }

        if (x <= 0 && y >= 0) {
            res = res || checkHit(point, radius, Quarter.SECOND);
        }

        if (x <= 0 && y <= 0) {
            res = res || checkHit(point, radius, Quarter.THIRD);
        }

        if (x >=0 && y <= 0) {
            res = res || checkHit(point, radius, Quarter.FORTH);
        }

        return res;
    }
}
